import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function UserDashboard({ navigation }) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>User Dashboard</Text>
            
            {/* Profile Section */}
            <Button 
                title="View Profile"
                onPress={() => navigation.navigate('UserProfile')}
            />

            {/* Trainers Section */}
            <Button 
                title="View Trainers"
                onPress={() => navigation.navigate('ViewTrainers')}
            />

            {/* Goals Section */}
            <Button 
                title="Set Fitness Goals"
                onPress={() => navigation.navigate('SetGoals')}
            />

            {/* Progress Section */}
            <Button 
                title="Track Progress"
                onPress={() => navigation.navigate('TrackProgress')}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
    },
    title: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10
    }
});
