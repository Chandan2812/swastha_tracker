import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from './screens/Welcome/WelcomeScreen';
import LoginScreen from './screens/User/LoginScreen';
import RegisterScreen from './screens/User/RegisterScreen'
import TrainerLoginScreen from './screens/Trainer/TrainerLoginScreen';
import TrainerRegisterScreen from './screens/Trainer/TrainerRegisterScreen'


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
        <Stack.Screen name="TrainerLoginScreen" component={TrainerLoginScreen} />
        <Stack.Screen name="TrainerRegisterScreen" component={TrainerRegisterScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
