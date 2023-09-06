import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from './screens/Welcome/WelcomeScreen';
import { UserProvider } from './context/UserContext';

import LoginScreen from './screens/User/LoginScreen';
import RegisterScreen from './screens/User/RegisterScreen'
import UserDashboardScreen from './screens/User/UserDashboardScreen'
import UserProfileScreen from './screens/User/UserProfileScreen';
import UpdateProfileScreen from './screens/User/UpdateProfileScreen';
import TrainerSelectionScreen from './screens/User/TrainerSelectionScreen';
import TrainerDetailsScreen from './screens/User/TrainerDetailsScreen';
import GoalManagementScreen from './screens/User/GoalManagementScreen';

import TrainerLoginScreen from './screens/Trainer/TrainerLoginScreen';
import TrainerRegisterScreen from './screens/Trainer/TrainerRegisterScreen'
import TrainerDashboardScreen from './screens/Trainer/TrainerDashboardScreen'
import TrainerProfileScreen from './screens/Trainer/TrainerProfileScreen';
import UpdateTrainerProfileScreen from './screens/Trainer/UpdateTrainerProfileScreen';
import WorkoutManagementScreen from './screens/Trainer/WorkoutManagementScreen';
import NutritionManagementScreen from './screens/Trainer/NutritionManagementScreen';

import { TrainerProvider } from './context/TrainerContext';

const Stack = createStackNavigator();

export default function App() {
  return (
    <UserProvider>
      <TrainerProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Welcome">
            <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }}/>
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
            <Stack.Screen name="UserDashboardScreen" component={UserDashboardScreen} />
            <Stack.Screen name="UserProfileScreen" component={UserProfileScreen} />
            <Stack.Screen name="UpdateProfileScreen" component={UpdateProfileScreen} />
            <Stack.Screen name="TrainerSelectionScreen" component={TrainerSelectionScreen} />
            <Stack.Screen name="TrainerDetailsScreen" component={TrainerDetailsScreen} />
            <Stack.Screen name="GoalManagementScreen" component={GoalManagementScreen} />
            <Stack.Screen name="TrainerLoginScreen" component={TrainerLoginScreen} />
            <Stack.Screen name="TrainerRegisterScreen" component={TrainerRegisterScreen} />
            <Stack.Screen name="TrainerDashboardScreen" component={TrainerDashboardScreen} />
            <Stack.Screen name="TrainerProfileScreen" component={TrainerProfileScreen} />
            <Stack.Screen name="UpdateTrainerProfileScreen" component={UpdateTrainerProfileScreen} />
            <Stack.Screen name="WorkoutManagementScreen" component={WorkoutManagementScreen} />
            <Stack.Screen name="NutritionManagementScreen" component={NutritionManagementScreen} />

          </Stack.Navigator>
        </NavigationContainer>
      </TrainerProvider>
    </UserProvider>
  );
}
