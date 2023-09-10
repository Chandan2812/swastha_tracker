import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, ImageBackground, Image, TextInput, Modal, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useUser } from '../../context/UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { BlurView } from "@react-native-community/blur";

const GoalManagementScreen = ({ navigation }) => {
  const { user, setUser } = useUser();
  const [goals, setGoals] = useState([]);

  const [modalVisible, setModalVisible] = useState(false);
    const [goalTitle, setGoalTitle] = useState('');
    const [goalTargetDate, setGoalTargetDate] = useState('');
    const [goalCurrentStatus, setGoalCurrentStatus] = useState('Not Started');
    const [goalDescription, setGoalDescription] = useState('');

    const [editModalVisible, setEditModalVisible] = useState(false);
    const [currentEditingGoal, setCurrentEditingGoal] = useState(null);


    const fetchGoals = async () => {
        const token = await AsyncStorage.getItem('userToken');
  
        try {
          const response = await fetch('https://swastha-tracker-app.onrender.com/users/goals/', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Token ${token}`,
            },
          });
  
          const result = await response.json();
          if (response.status === 200) {
              // console.log(result)
            setGoals(result);
          } else {
            alert('Failed to fetch goals. Please try again.');
          }
        } catch (error) {
          console.log(error);
          alert('An error occurred. Please try again.');
        }
      };

  useEffect(() => {

    fetchGoals();
  }, []);

  const handleLogout = () => {
    navigation.navigate('LoginScreen');
  };



  const createGoal = async () => {
    const token = await AsyncStorage.getItem('userToken');
  
    const data = {
      user:user.id,
      title: goalTitle,
      target_date: goalTargetDate,
      current_status: goalCurrentStatus,
      description: goalDescription,
    };
  
    try {
        const token = await AsyncStorage.getItem('userToken');

      const response = await fetch('https://swastha-tracker-app.onrender.com/users/goals/create/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`,
        },
        body: JSON.stringify(data),
      });
  
      if (response.status === 201) {
        Alert.alert('Success', 'Goal created successfully!');
        setModalVisible(false);
        // Re-fetch goals to update the list
        fetchGoals();
      } else {
        const result = await response.json();
        console.log(result)
        Alert.alert('Error', result.error || 'Failed to create goal. Please try again.');
      }
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'An unexpected error occurred. Please try again.');
    }
  };
  



  const updateGoal = async () => {
    const token = await AsyncStorage.getItem('userToken');
  
    const data = {
      user: user.id,
      title: goalTitle,
      target_date: goalTargetDate,
      current_status: goalCurrentStatus,
      description: goalDescription,
    };
  
    try {
      const response = await fetch(`https://swastha-tracker-app.onrender.com/users/goals/${currentEditingGoal.id}/update/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`,
        },
        body: JSON.stringify(data),
      });
  
      if (response.status === 200) {
        Alert.alert('Success', 'Goal updated successfully!');
        setEditModalVisible(false);
        // Re-fetch goals to update the list
        fetchGoals();
      } else {
        const result = await response.json();
        Alert.alert('Error', result.error || 'Failed to update goal. Please try again.');
      }
    } catch (error) {
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
        {goals.map(goal => (
          <View key={goal.id} style={styles.goalContainer}>
            <Image source={require('../../assets/goal.jpeg')} style={styles.goalImage} />
            <Text style={styles.goalTitle}>{goal.title}</Text>
            <Text style={styles.goalDate}>Target Date: {goal.target_date}</Text>
            <Text style={styles.goalStatus}>Status: {goal.current_status}</Text>
            <Text style={styles.goalStatus}>Description: {goal.description}</Text>
            <TouchableOpacity 
                style={styles.editButton} 
                onPress={() => {
                    setCurrentEditingGoal(goal);
                    setGoalTitle(goal.title);
                    setGoalTargetDate(goal.target_date);
                    setGoalCurrentStatus(goal.current_status);
                    setGoalDescription(goal.description);
                    setEditModalVisible(true);
                }}
                >
                <Text style={styles.editButtonText}>Edit</Text>
             </TouchableOpacity>

          </View>
        ))}
        
      </ScrollView>
      <TouchableOpacity style={styles.createButton} onPress={() => setModalVisible(true)}>
                    <Text style={styles.createButtonText}>Create Goal</Text>
        </TouchableOpacity>

      <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.overlay} />
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <TextInput
                            value={goalTitle}
                            onChangeText={setGoalTitle}
                            style={styles.input}
                            placeholder="Title"
                        />
                        <TextInput
                            value={goalTargetDate}
                            onChangeText={setGoalTargetDate}
                            style={styles.input}
                            placeholder="Target Date"
                        />
                        <Picker
                            selectedValue={goalCurrentStatus}
                            style={styles.input}
                            onValueChange={(itemValue) => setGoalCurrentStatus(itemValue)}
                        >
                            <Picker.Item label="Not Started" value="Not Started" />
                            <Picker.Item label="In Progress" value="In Progress" />
                            <Picker.Item label="Completed" value="Completed" />
                        </Picker>
                        <TextInput
                            value={goalDescription}
                            onChangeText={setGoalDescription}
                            style={styles.input}
                            placeholder="Description"
                        />
                        <TouchableOpacity style={styles.button} onPress={createGoal}>
                            <Text style={styles.buttonText}>Submit</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.cancelbutton} onPress={() => setModalVisible(false)}>
                            <Text style={styles.buttonText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                
        </Modal>


        <Modal
            animationType="slide"
            transparent={true}
            visible={editModalVisible}
            onRequestClose={() => {
                setEditModalVisible(!editModalVisible);
            }}
            >
            <View style={styles.overlay} />
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <TextInput
                            value={goalTitle}
                            onChangeText={setGoalTitle}
                            style={styles.input}
                            placeholder="Title"
                        />
                        <TextInput
                            value={goalTargetDate}
                            onChangeText={setGoalTargetDate}
                            style={styles.input}
                            placeholder="Target Date"
                        />
                        <Picker
                            selectedValue={goalCurrentStatus}
                            style={styles.input}
                            onValueChange={(itemValue) => setGoalCurrentStatus(itemValue)}
                        >
                            <Picker.Item label="Not Started" value="Not Started" />
                            <Picker.Item label="In Progress" value="In Progress" />
                            <Picker.Item label="Completed" value="Completed" />
                        </Picker>
                        <TextInput
                            value={goalDescription}
                            onChangeText={setGoalDescription}
                            style={styles.input}
                            placeholder="Description"
                        />

            <TouchableOpacity style={styles.button} onPress={updateGoal}>
                <Text style={styles.buttonText}>Update</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.cancelbutton} onPress={() => setEditModalVisible(false)}>
                <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            </View>
            </View>
        </Modal>


    </ImageBackground>
  );
}

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
      padding: 20,
    },
    goalContainer: {
      backgroundColor: 'rgba(255, 255, 255, 0.8)',  // semi-transparent white
      borderRadius: 10,
      padding: 15,
      marginBottom: 20,
      flexDirection: 'column',
      alignItems: 'center',
    },
    goalImage: {
      width: 50,
      height: 50,
      borderRadius: 25,
      marginRight: 15,
    },
    goalTitle: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    goalDate: {
      fontSize: 14,
      color: '#888',
    },
    goalStatus: {
      fontSize: 16,
      marginTop: 5,
    },
    editButton: {
      position: 'absolute',
      right: 10,
      top: 10,
      padding: 5,
      backgroundColor: '#48BF91',
      borderRadius: 5,
    },
    editButtonText: {
      color: '#fff',
      fontSize: 16,
    },
    createButton: {
      backgroundColor: '#48BF91',
      padding: 15,
      borderRadius: 7,
      alignItems: 'center',
      marginTop: 20,
    },
    createButtonText: {
      color: '#fff',
      fontSize: 18,
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    input: {
        width: 200,
        height: 40,
        borderBottomWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    button: {
        backgroundColor: '#48BF91',
        padding: 10,
        borderRadius: 7,
        width: '100%',
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
    },
    cancelbutton:{
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 7,
        width: '100%',
        alignItems: 'center',
        marginTop: 10,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.7)' 
    },
  });
  

export default GoalManagementScreen;
