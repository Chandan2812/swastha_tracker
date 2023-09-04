import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Login from '../screens/common/Login';
import Register from '../screens/common/Register';
import UserDashboard from '../screens/user/UserDashboard';
import TrainerDashboard from '../screens/trainer/TrainerDashboard';

const Stack = createStackNavigator();

function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="UserDashboard" component={UserDashboard} />
      <Stack.Screen name="TrainerDashboard" component={TrainerDashboard} />
    </Stack.Navigator>
  );
}

export default AppNavigator;
