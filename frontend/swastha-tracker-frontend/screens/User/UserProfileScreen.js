import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useUser } from '../../context/UserContext';
import { useFocusEffect } from '@react-navigation/native';



const UserProfileScreen = ({navigation}) => {
    const { user, setUser } = useUser();
  const [profileData, setProfileData] = useState(null);
  const handleLogout = () => {
    navigation.navigate('LoginScreen');
  };
 
    const fetchProfile = async () => {
      const token = await AsyncStorage.getItem('userToken');
      
      try {
        const response = await fetch('http://192.168.29.28:8000/users/profile/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`,
          },
        });
  
        const result = await response.json();
  
        if (response.status === 200) {
          setProfileData(result);
        } else {
          alert('Failed to fetch profile data. Please try again.');
        }
      } catch (error) {
        console.log(error);
        alert('An unexpected error occurred. Please try again.');
      }
    };
  
    useFocusEffect(
        React.useCallback(() => {
          // Fetch the profile data here
          fetchProfile();
        }, [])
      );
      useEffect(() => {
        fetchProfile();
    }, []);

  const handleUpdateProfile = () => {
    navigation.navigate('UpdateProfileScreen'); 
  };

  if (!profileData) {
    return <Text>Loading...</Text>;
  }

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
      <View style={styles.container}>
        <Text style={styles.profileText}>Name: {profileData.name}</Text>
        <Text style={styles.profileText}>Age: {profileData.age}</Text>
        <Text style={styles.profileText}>Gender: {profileData.gender}</Text>
        <Text style={styles.profileText}>Height: {profileData.height} cm</Text>
        <Text style={styles.profileText}>Weight: {profileData.weight} kg</Text>
        <Text style={styles.profileText}>Email: {profileData.email}</Text>
        <Text style={styles.profileText}>Contact Number: {profileData.contact_number}</Text>
        <TouchableOpacity style={styles.updateButton} onPress={handleUpdateProfile}>
          <Text style={styles.updateButtonText}>Update Profile</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
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
  container: {
    flex: 1,
    padding: 30, 
    margin:20,
    backgroundColor:'white',
    borderRadius:20,

  },
  profileText: {
    fontSize: 18,   
    marginBottom: 15,   
    color: '#333',
    opacity: 0.85, 

  },
  updateButton: {
    marginTop: 200,
    backgroundColor: '#48BF91',
    padding: 15,
    borderRadius: 7,
    width: '100%',
    alignItems: 'center',
  },
  updateButtonText: {
    color: '#fff',
    fontSize: 18,
  }
});

export default UserProfileScreen;
