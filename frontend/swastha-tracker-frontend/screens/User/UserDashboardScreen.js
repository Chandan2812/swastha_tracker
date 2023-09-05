import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useUser } from '../../context/UserContext';

const UserDashboardScreen = ({ navigation }) => {
    const { user } = useUser();
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Welcome, {user.name}!</Text>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('UserProfile')}>
        <Text style={styles.buttonText}>Profile Overview</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('TrainerSelection')}>
        <Text style={styles.buttonText}>Select a Trainer</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('GoalManagement')}>
        <Text style={styles.buttonText}>Manage Your Goals</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ProgressSection')}>
        <Text style={styles.buttonText}>View Progress</Text>
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
    elevation: 2,  // shadow for android
    shadowOpacity: 0.3, // shadow for iOS
    shadowRadius: 4,
    shadowOffset: { height: 3, width: 0 },
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  }
});

export default UserDashboardScreen;
