import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import { Button, Card, Text, useTheme } from 'react-native-paper';
import { RootStackParamList } from '../navigation/AppNavigator';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useAppContext } from '../context/AppContext';
import SafeAreaLayout from '../components/SafeAreaLayout';

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const { user } = useAppContext();
  const { colors } = useTheme();

  return (
    <SafeAreaLayout>
      <View
        className="flex-1 justify-center p-5"
        style={{ backgroundColor: colors.background }}
      >
        <StatusBar backgroundColor="#fff" barStyle="dark-content" />
        <View className="flex-1">
          <Card className="mb-7 py-5">
            <Card.Content>
              <Text
                variant="titleLarge"
                className="text-center mb-2 text-lg font-bold"
              >
                Welcome {user?.username || 'User'}!
              </Text>
              <Text variant="bodyMedium" className="text-center text-gray-500">
                We're glad you're here! Let's get started on something amazing.
                This is your employee management dashboard
              </Text>
            </Card.Content>
          </Card>
        </View>

        <Button
          mode="contained"
          onPress={() => navigation.navigate('Employees')}
          className="my-2 py-2"
          icon={() => (
            <MaterialCommunityIcons
              name="account-group"
              size={20}
              color="#fff"
            />
          )}
          style={styles.button}
        >
          View Employees
        </Button>

        <Button
          mode="outlined"
          onPress={() => navigation.navigate('WeatherReport')}
          className="my-2 py-2"
          style={styles.button}
          icon={() => (
            <MaterialCommunityIcons
              name="apple-icloud"
              size={20}
              color="#6200ee"
            />
          )}
        >
          Weather Report
        </Button>
      </View>
    </SafeAreaLayout>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 10,
  },
});

export default HomeScreen;
