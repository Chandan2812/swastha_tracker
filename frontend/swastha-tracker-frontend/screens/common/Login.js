import React from 'react';
import { View, Text, Button } from 'react-native';

export default function Login({ navigation }) { // Get the navigation prop
    return (
        <View>
            <Text>Login Screen</Text>
            <Button 
                title="Go to Register" 
                onPress={() => navigation.navigate('Register')} // Use the navigation prop to navigate to Register
            />
            <Button 
                title="Go to UserDashboard" 
                onPress={() => navigation.navigate('UserDashboard')} // Use the navigation prop to navigate to Register
            />
            <Button 
                title="Go to TrainerDashboard" 
                onPress={() => navigation.navigate('TrainerDashboard')} // Use the navigation prop to navigate to Register
            />
        </View>
    );
}
