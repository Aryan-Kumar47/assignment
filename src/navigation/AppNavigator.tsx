import React from 'react';
import EmployeeFormScreen from '../screen/EmployeeFormScreen';
import EmployeeListScreen from '../screen/EmployeeListScreen';
import HomeScreen from '../screen/HomeScreen';
import LoginScreen from '../screen/LoginScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WeatherReport from '../screen/WeatherReport';

export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Employees: undefined;
  EmployeeForm: undefined;
  WeatherReport: undefined;
};

const AppNavigator = () => {
  const Stack = createNativeStackNavigator<RootStackParamList>();
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Employees" component={EmployeeListScreen} />
        <Stack.Screen name="EmployeeForm" component={EmployeeFormScreen} />
        <Stack.Screen name="WeatherReport" component={WeatherReport} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
