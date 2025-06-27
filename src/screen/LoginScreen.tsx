import React, { useState } from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import { Button, TextInput, Text, useTheme } from 'react-native-paper';
import { RootStackParamList } from '../navigation/AppNavigator';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { showToast } from '../utlis/toast';
import { useAppContext } from '../context/AppContext';
import * as Yup from 'yup';
import { Formik } from 'formik';
import SafeAreaLayout from '../components/SafeAreaLayout';

type LoginScreenProps = NativeStackScreenProps<RootStackParamList, 'Login'>;
const validationSchema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  email: Yup.string()
    .email('Invalid email')
    .required('Email is required')
    .matches(
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      'Please enter a valid email address',
    ),
  password: Yup.string().required('Password is required'),
});

const LoginScreen = ({ navigation }: LoginScreenProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { setUser } = useAppContext();
  const { colors } = useTheme();

  const handleLogin = (values: {
    email: string;
    password: string;
    username: string;
  }) => {
    if (isLoading) return;

    const { email, password, username } = values;

    if (!email || !password) {
      showToast({
        type: 'error',
        title: 'Empty Field',
        message: 'Please enter email and password',
      });
      return;
    }

    setUser({ email: email, username: username });

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      showToast({
        type: 'success',
        title: 'Login successfully',
        message: `${username} login successfully`,
      });
      navigation.replace('Home');
    }, 1000);
  };

  return (
    <SafeAreaLayout>
      <View
        className="flex-1 p-5"
        style={{ backgroundColor: colors.background }}
      >
        <StatusBar backgroundColor="#fff" barStyle="dark-content" />
        <Text variant="headlineMedium" style={styles.title}>
          Welcome Back
        </Text>
        <Formik
          initialValues={{ email: '', password: '', username: '' }}
          validationSchema={validationSchema}
          onSubmit={handleLogin}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <>
              <TextInput
                label="Username"
                value={values.username}
                onChangeText={handleChange('username')}
                onBlur={handleBlur('username')}
                style={styles.input}
                keyboardType="web-search"
                autoCapitalize="none"
                error={
                  (touched.username && errors.username) as boolean | undefined
                }
                underlineColor="transparent"
              />
              {touched.username && errors.username && (
                <Text style={styles.errorText}>{errors.username}</Text>
              )}

              <TextInput
                label="Email"
                value={values.email}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                style={styles.input}
                keyboardType="email-address"
                autoCapitalize="none"
                underlineColor="transparent"
                error={(touched.email && errors.email) as boolean | undefined}
              />
              {touched.email && errors.email && (
                <Text style={styles.errorText}>{errors.email}</Text>
              )}

              <TextInput
                label="Password"
                value={values.password}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                secureTextEntry
                style={styles.input}
                underlineColor="transparent"
                error={
                  (touched.password && errors.password) as boolean | undefined
                }
                underlineStyle={{ borderRadius: 10 }}
              />
              {touched.password && errors.password && (
                <Text style={styles.errorText}>{errors.password}</Text>
              )}

              <Button
                mode="contained"
                disabled={isLoading}
                loading={isLoading}
                onPress={() => handleSubmit()}
                style={styles.button}
              >
                Login
              </Button>
            </>
          )}
        </Formik>
      </View>
    </SafeAreaLayout>
  );
};

const styles = StyleSheet.create({
  title: {
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    marginBottom: 15,
  },
  button: {
    borderRadius: 10,
    marginTop: 10,
    paddingVertical: 5,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
  },
});

export default LoginScreen;
