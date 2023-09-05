import React, { useState, useEffect } from 'react';
import { View,Text, TextInput, StyleSheet, ImageBackground, Alert, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTrainer } from '../../context/TrainerContext';

const TrainerUpdateProfileScreen = ({ navigation }) => {
    const { trainer, setTrainer } = useTrainer();
    const [profileData, setProfileData] = useState(null);
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");
    const [specialization, setSpecialization] = useState("");
    const [experience, setExperience] = useState("");
    const [contact_number, setContact_Number] = useState("");
    const [bio, setBio] = useState("");

    useEffect(() => {
        const fetchProfile = async () => {
          const token = await AsyncStorage.getItem('trainerToken');
          
          try {
            const response = await fetch('http://192.168.29.28:8000/trainers/profile/', {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`,
              },
            });

            const result = await response.json();
      
            if (response.status === 200) {
                setProfileData(result);
                setName(result.name || "");
                setAge(result.age ? result.age.toString() : "");
                setGender(result.gender || "");
                setSpecialization(result.specialization || "");
                setExperience(result.experience ? result.experience.toString() : "");
                setContact_Number(result.contact_number || "");
                setBio(result.bio || "");
            }else {
                alert('Failed to fetch trainer profile data. Please try again.');
                }
          } catch (error) {
            console.log(error);
            alert('An unexpected error occurred. Please try again.');
          }
        };
      
        fetchProfile();
      }, []);

    const handleLogout = () => {
        setTrainer(null)
        navigation.navigate('TrainerLoginScreen');
      };

    const handleUpdate = async () => {
        const data = {
            name,
            age,
            gender,
            specialization,
            experience,
            contact_number,
            bio
        };
      
        const token = await AsyncStorage.getItem('trainerToken');

        try {
            const response = await fetch('http://192.168.29.28:8000/trainers/profile/update/', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`,
                },
                body: JSON.stringify(data),
            });

            if (response.status === 200) {
                Alert.alert('Success', 'Trainer profile updated successfully!');
                navigation.goBack();
            } else {
                const result = await response.json();
                Alert.alert('Error', result.error || 'Failed to update trainer profile. Please try again.');
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
                <Text style={styles.userName}>{trainer.name}</Text>
                <TouchableOpacity onPress={handleLogout}>
                    <Text style={styles.logout}>Logout</Text>
                </TouchableOpacity>
                </View>
            </View>
            <View style={styles.container}>
                <TextInput
                    value={name}
                    style={styles.input}
                    placeholder="Name"
                    editable={false} 
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
                    style={styles.input}
                    placeholder="Gender"
                    editable={false} 
                />
                <TextInput
                    value={specialization}
                    onChangeText={setSpecialization}
                    style={styles.input}
                    placeholder="Specialization"
                />
                <TextInput
                    value={experience}
                    onChangeText={setExperience}
                    style={styles.input}
                    placeholder="Experience"
                    keyboardType="numeric"
                />
                <TextInput
                    value={bio}
                    onChangeText={setBio}
                    style={styles.input}
                    placeholder="Bio"
                    multiline={true}
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
            </View>
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

export default TrainerUpdateProfileScreen;
