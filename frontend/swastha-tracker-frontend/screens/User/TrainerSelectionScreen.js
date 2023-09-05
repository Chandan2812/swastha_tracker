import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useUser } from '../../context/UserContext';

const TrainerSelectionScreen = ({ navigation }) => {
    const { user, setUser } = useUser();
  const [trainers, setTrainers] = useState([]);
  const handleLogout = () => {
    navigation.navigate('LoginScreen');
  };

  useEffect(() => {
    const fetchTrainers = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        const response = await fetch('http://192.168.29.28:8000/users/trainers/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`, 
            },
        });

        const data = await response.json();
        // console.log(data)
        setTrainers(data);
      } catch (error) {
        console.error("Failed fetching trainers:", error);
      }
    };

    fetchTrainers();
  }, []);

  const renderTrainer = ({ item }) => (
    <TouchableOpacity style={styles.trainerCard}>
      <Image source={require('../../assets/trainer.png')} style={styles.trainerImage} />
      <Text style={styles.trainerName}>{item.name}</Text>
      <Text style={styles.trainerDetail}>Gender: {item.gender}</Text>
      <Text style={styles.trainerDetail}>Experience: {item.experience} years</Text>
      <Text style={styles.trainerDetail}>Specialization: {item.specialization}</Text>
      
    </TouchableOpacity>
  );

  return (
    <ImageBackground source={require('../../assets/aa.jpg')} style={styles.backgroundImage}>
        <View style={styles.header}>
        <Image source={require('../../assets/logo.png')} style={styles.logo} />
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{user.name}</Text>
          <TouchableOpacity onPress={handleLogout}>
            <Text style={styles.logout}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    <FlatList 
      data={trainers}
      renderItem={renderTrainer}
      keyExtractor={(item) => item.id.toString()} 
      contentContainerStyle={styles.listContainer}
    />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    padding: 20,
  },
  trainerCard: {
    padding: 20,
    marginBottom: 20,
    backgroundColor: '#FFF',
    borderRadius: 10,
    shadowOpacity: 0.25,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
  },
  trainerImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
  },
  trainerName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  trainerDetail: {
    fontSize: 15,
    marginBottom: 5,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
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
    width: 100,
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

export default TrainerSelectionScreen;
