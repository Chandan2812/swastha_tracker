import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useTrainer } from '../../context/TrainerContext';

const TrainerDashboardScreen = ({ navigation }) => {
    const { trainer } = useTrainer(); // Use the trainer context
    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Welcome, Trainer {trainer.name}!</Text>

            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('TrainerProfile')}>
                <Text style={styles.buttonText}>Profile Overview</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ClientManagement')}>
                <Text style={styles.buttonText}>Manage Your Clients</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('WorkoutManagement')}>
                <Text style={styles.buttonText}>Manage Workouts</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('NutritionManagement')}>
                <Text style={styles.buttonText}>Manage Nutrition Plans</Text>
            </TouchableOpacity>

        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#FFFFFF'
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#48BF91'
    },
    button: {
        backgroundColor: '#48BF91',
        padding: 15,
        marginVertical: 10,
        borderRadius: 7,
        alignItems: 'center',
        elevation: 2,  // shadow for Android
        shadowOpacity: 0.3, // shadow for iOS
        shadowRadius: 4,
        shadowOffset: { height: 3, width: 0 },
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
    }
});

export default TrainerDashboardScreen;
