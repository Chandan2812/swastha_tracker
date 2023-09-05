import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView,ImageBackground, Image } from 'react-native';
import { useTrainer } from '../../context/TrainerContext';

const TrainerDashboardScreen = ({ navigation }) => {
    const { trainer } = useTrainer(); 
    const handleLogout = () => {
        navigation.navigate('TrainerLoginScreen');
      };
    return (
        <ImageBackground source={require('../../assets/aa.jpg')} style={styles.backgroundImage}>
            <View style={styles.header}>
                <Image source={require('../../assets/logo.png')} style={styles.logo} />
                <View style={styles.userInfo}>
                <Text style={styles.userName}>{trainer.name}</Text>
                <TouchableOpacity onPress={handleLogout}>
                    <Text style={styles.logout}>Logout</Text>
                </TouchableOpacity>
                </View>
            </View>
        <ScrollView style={styles.container}>

            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('TrainerProfileScreen')}>
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
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
   
      backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%',
      },
    container: {
        flex: 1,
        padding: 20,
        // backgroundColor: '#FFFFFF'
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
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc'
      },
      logo: {
        width: 150,
        height: 50,
        resizeMode: 'contain'
      },
      userInfo: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      userName: {
        marginRight: 10,
        fontSize: 18,
      },
      logout: {
        color: '#FF0000',  // red color for logout
        textDecorationLine: 'underline'
      },
});

export default TrainerDashboardScreen;
