// screens/EmployeeFormScreen.tsx
import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import { Button, TextInput, Text, useTheme } from 'react-native-paper';
import { Formik } from 'formik';
import * as Yup from 'yup';
import ImagePicker from 'react-native-image-crop-picker';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useAppContext } from '../context/AppContext';
import { showToast } from '../utlis/toast';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SafeAreaLayout from '../components/SafeAreaLayout';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string()
    .email('Invalid email')
    .required('Email is required')
    .matches(
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      'Please enter a valid email address',
    ),
});

type EmployeeFormScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'EmployeeForm'
>;

const EmployeeFormScreen = ({ navigation }: EmployeeFormScreenProps) => {
  const { colors } = useTheme();

  const [image, setImage] = useState<string | null>(null);
  const { employees, setEmployees } = useAppContext();

  // const handleImagePick = () => {
  //   console.log('called');
  //   ImagePicker.openPicker({
  //     width: 300,
  //     height: 400,
  //     cropping: true,
  //   }).then(img => {
  //     setImage(img.path);
  //   });
  // };

  interface ImageResult {
    path: string;
    width: number;
    height: number;
    mime: string;
    size?: number;
  }

  const handleImagePick = async () => {
    try {
      const image = await ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true,
        cropperStatusBarColor: '#ffffff',
        cropperToolbarColor: '#ffffff',
        cropperToolbarWidgetColor: '#000000',
        mediaType: 'photo', // Avoid picking videos by mistake
        forceJpg: true, // Helps prevent crashes on Android 10+
        hideBottomControls: true,
      });

      if (image?.path) {
        setImage(image.path);
      }
    } catch (error) {
      console.error('Image pick error:', error);
    }
  };

  const handleSubmit = (values: any) => {
    if (!image) {
      showToast({
        type: 'error',
        title: 'Image Required',
        message: 'Please upload user image',
      });
      return;
    }
    const newEmployee = {
      ...values,
      id: employees.length + 1,
      image,
    };
    setEmployees(prev => [...prev, newEmployee]);
    showToast({
      type: 'success',
      title: 'Add successfully',
      message: `Employee add successfully`,
    });

    navigation.goBack();
  };

  return (
    <SafeAreaLayout>
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <StatusBar backgroundColor="#fff" barStyle="dark-content" />
        <View className="flex-row items-center p-[10px] text-center gap-x-6">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="p-3 border border-gray-300 rounded-full"
          >
            <MaterialCommunityIcons
              className=""
              name="arrow-left-top"
              size={18}
              color="#1f2937"
            />
          </TouchableOpacity>
          <Text variant="headlineMedium">Weather Report</Text>
        </View>
        <ScrollView>
          <View className="flex-1 mt-5">
            <Formik
              initialValues={{ name: '', email: '' }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                touched,
              }) => (
                <View>
                  <TextInput
                    label="Name"
                    onChangeText={handleChange('name')}
                    onBlur={handleBlur('name')}
                    value={values.name}
                    error={(touched.name && errors.name) as boolean | undefined}
                    style={styles.input}
                  />
                  {touched.name && errors.name && (
                    <Text style={styles.error}>{errors.name}</Text>
                  )}

                  <TextInput
                    label="Email"
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    value={values.email}
                    keyboardType="email-address"
                    error={
                      (touched.email && errors.email) as boolean | undefined
                    }
                    style={styles.input}
                  />
                  {touched.email && errors.email && (
                    <Text style={styles.error}>{errors.email}</Text>
                  )}

                  {image && (
                    <Image
                      source={{ uri: image }}
                      style={styles.imagePreview}
                      resizeMode="cover"
                    />
                  )}
                  <Button
                    mode="outlined"
                    onPress={handleImagePick}
                    style={styles.imageButton}
                  >
                    {image ? 'Change Image' : 'Upload Image'}
                  </Button>
                  <Button
                    mode="contained"
                    onPress={() => handleSubmit()}
                    style={styles.submitButton}
                  >
                    Save Employee
                  </Button>
                </View>
              )}
            </Formik>
          </View>
        </ScrollView>
      </View>
    </SafeAreaLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    marginBottom: 10,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
  imageButton: {
    marginVertical: 15,
    paddingVertical: 5,
    borderRadius: 10,
  },
  imagePreview: {
    width: '100%',
    height: 200,
    marginBottom: 15,
    borderRadius: 5,
  },
  submitButton: {
    marginTop: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },
});

export default EmployeeFormScreen;
