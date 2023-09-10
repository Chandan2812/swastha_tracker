import React, { useState, useEffect } from 'react';
import { View,Text, TextInput, Button, StyleSheet, ImageBackground, Alert, Image, TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useUser } from '../../context/UserContext';

const UpdateProfileScreen = ({ navigation }) => {
    const { user,setUser } = useUser();
    const [profileData, setProfileData] = useState(null);
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");
    const [height, setHeight] = useState("");
    const [weight, setWeight] = useState("");
    const [contact_number, setContact_Number] = useState("");
    const [email, setEmail] = useState("")

    

    useEffect(() => {
        const fetchProfile = async () => {
          const token = await AsyncStorage.getItem('userToken');
          
          try {
            const response = await fetch('https://swastha-tracker-app.onrender.com/users/profile/', {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`,
              },
            });
      
            const result = await response.json();
      
            if (response.status === 200) {
                setProfileData(result);
                setEmail(result.email || "");
                setName(result.name || "");
                setAge(result.age ? result.age.toString() : "");
                setGender(result.gender || "");
                setHeight(result.height ? result.height.toString() : "");
                setWeight(result.weight ? result.weight.toString() : "");
                setContact_Number(result.contact_number || "");
            }else {
                alert('Failed to fetch profile data. Please try again.');
                }
          } catch (error) {
            console.log(error);
            alert('An unexpected error occurred. Please try again.');
          }
        };
      
        fetchProfile();
      }, []);

    const handleLogout = () => {
        navigation.navigate('LoginScreen');
      };

    const handleUpdate = async () => {
        const data = {
            name,
            age,
            gender,
            height,
            weight,
            email,
            contact_number,
        };
      
        const token = await AsyncStorage.getItem('userToken');

        try {
            const response = await fetch('https://swastha-tracker-app.onrender.com/users/profile/update/', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`,
                },
                body: JSON.stringify(data),
            });

            if (response.status === 200) {
                Alert.alert('Success', 'Profile updated successfully!');
                navigation.goBack();
            } else {
                const result = await response.json();
                Alert.alert('Error', result.error || 'Failed to update profile. Please try again.');
            }
        } catch (error) {
            console.log(error);
            Alert.alert('Error', 'An unexpected error occurred. Please try again.');
        }
    };

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
            <ScrollView style={styles.container}>
                <TextInput
                    value={email}
                    style={styles.input}
                    placeholder="Email"
                    editable={false} 
                />

                <TextInput
                    value={name}
                    onChangeText={setName}
                    style={styles.input}
                    placeholder="Name"
                />
                <TextInput
                    value={age}
                    onChangeText={setAge}
                    style={styles.input}
                    placeholder="Age"
                    keyboardType="numeric"
                />
                <TextInput
                    value={gender}
                    onChangeText={setGender}
                    style={styles.input}
                    placeholder="Gender"
                    editable={false}
                />
                <TextInput
                    value={height}
                    onChangeText={setHeight}
                    style={styles.input}
                    placeholder="Height"
                    keyboardType="numeric"
                />
                <TextInput
                    value={weight}
                    onChangeText={setWeight}
                    style={styles.input}
                    placeholder="Weight"
                    keyboardType="numeric"
                />
                <TextInput
                    value={contact_number}
                    onChangeText={setContact_Number}
                    style={styles.input}
                    placeholder="Contact Number"
                    keyboardType="numeric"
                />
            
                <TouchableOpacity style={styles.updateButton} onPress={handleUpdate}>
                    <Text style={styles.updateButtonText}>Update Profile</Text>
                </TouchableOpacity>
            </ScrollView>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
    },
    container: {
        flex: 1,
        padding: 20,
    },
    input: {
        width: '100%',
        padding: 15,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 7,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
    },
    updateButton: {
        backgroundColor: '#48BF91',
        padding: 15,
        borderRadius: 7,
        width: '100%',
        alignItems: 'center',
      },
      updateButtonText: {
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

export default UpdateProfileScreen;
