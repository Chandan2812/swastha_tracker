import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const TrainerDashboard = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>Hello, Trainer!</Text>
            <Button 
                title="View Profile"
                onPress={() => navigation.navigate('TrainerProfile')}
            />
            <Button 
                title="Manage Workouts"
                onPress={() => {/* Navigate to manage workouts screen */}}
            />
            <Button 
                title="Manage Nutrition Plans"
                onPress={() => {/* Navigate to manage nutrition plans screen */}}
            />
            <Button 
                title="View Users' Progress"
                onPress={() => {/* Navigate to users' progress screen */}}
            />
            {/* Add more buttons or components as needed */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerText: {
        fontSize: 24,
        marginBottom: 20,
    },
});

export default TrainerDashboard;
