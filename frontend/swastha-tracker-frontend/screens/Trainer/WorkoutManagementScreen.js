import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, Alert,ImageBackground, TextInput, Modal,KeyboardAvoidingView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTrainer } from '../../context/TrainerContext';

const WorkoutManagementScreen = ({ navigation }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [duration, setDuration] = useState('');
    const [exercises, setExercises] = useState('');
    const [sets, setSets] = useState('');
    const [repsPerSet, setRepsPerSet] = useState('');
    const [restInterval, setRestInterval] = useState('');
    

    const [workouts, setWorkouts] = useState([]);

    const { trainer } = useTrainer(); 
    const handleLogout = () => {
        navigation.navigate('TrainerLoginScreen');
      };
    useEffect(() => {
        fetchWorkouts();
    }, []);

    const fetchWorkouts = async () => {
        const token = await AsyncStorage.getItem('trainerToken'); 

        try {
            const response = await fetch('https://swastha-tracker-app.onrender.com/trainers/workouts/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`,
                },
            });

            const result = await response.json();

            if (response.status === 200) {
                setWorkouts(result);
            } else {
                Alert.alert('Error', 'Failed to fetch workouts.');
            }
        } catch (error) {
            Alert.alert('Error', 'An unexpected error occurred.');
        }
    };

    const createWorkout = async () => {
        const token = await AsyncStorage.getItem('trainerToken');
        // console.log(trainer.id)
        const data = {
            trainer:trainer.id,
            title,
            description,
            duration: parseInt(duration),
            exercises,
            sets: parseInt(sets),
            reps_per_set: parseInt(repsPerSet),
            rest_interval: restInterval
        };
    
        try {
            const response = await fetch('http://192.168.29.28:8000/trainers/workout/create/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`,
                },
                body: JSON.stringify(data),
            });
            // const responseText = await response.text();
            // console.log('Server Response:', responseText);

    
            if (response.status === 201) {
                Alert.alert('Success', 'Workout created successfully!');
                setModalVisible(false);
                fetchWorkouts();
            } else {
                const result = await response.json();
                Alert.alert('Error', result.error || 'Failed to create workout.');
            }
        } catch (error) {
            console.log(error)
            Alert.alert('Error', 'An unexpected error occurred.');
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
        <ScrollView style={styles.container}>
            {workouts.map(workout => (
                <View key={workout.id} style={styles.workoutContainer}>
                <Image source={require('../../assets/goal.jpeg')} style={styles.workoutImage} />
                <Text style={styles.workoutTitle}>{workout.title}</Text>
                <Text style={styles.workoutDescription}>{workout.description}</Text>
                <Text style={styles.workoutDetail}>Duration: {workout.duration} minutes</Text>
                <Text style={styles.workoutDetail}>Exercises: {workout.exercises}</Text>
                <Text style={styles.workoutDetail}>Sets: {workout.sets}</Text>
                <Text style={styles.workoutDetail}>Reps per Set: {workout.reps_per_set}</Text>
                <Text style={styles.workoutDetail}>Rest Interval: {workout.rest_interval}</Text>
            </View>
            ))}
            
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(!modalVisible);
                    }}
                >
                    <View style={styles.overlay} />
                    <KeyboardAvoidingView style={styles.centeredView}>
                        <View style={styles.modalView}>
                            {/* Title */}
                            <TextInput
                                value={title}
                                onChangeText={setTitle}
                                placeholder="Title"
                                style={styles.input}
                            />

                            {/* Description */}
                            <TextInput
                                value={description}
                                onChangeText={setDescription}
                                placeholder="Description"
                                multiline={true}
                                numberOfLines={4}
                                style={styles.input}
                            />

                            {/* Duration */}
                            <TextInput
                                value={duration}
                                onChangeText={setDuration}
                                placeholder="Duration (in minutes)"
                                keyboardType="numeric"
                                style={styles.input}
                            />

                            {/* Exercises */}
                            <TextInput
                                value={exercises}
                                onChangeText={setExercises}
                                placeholder="Exercises (comma-separated)"
                                style={styles.input}
                            />

                            {/* Sets */}
                            <TextInput
                                value={sets}
                                onChangeText={setSets}
                                placeholder="Sets"
                                keyboardType="numeric"
                                style={styles.input}
                            />

                            {/* Reps per Set */}
                            <TextInput
                                value={repsPerSet}
                                onChangeText={setRepsPerSet}
                                placeholder="Reps per Set"
                                keyboardType="numeric"
                                style={styles.input}
                            />

                            {/* Rest Interval */}
                            <TextInput
                                value={restInterval}
                                onChangeText={setRestInterval}
                                placeholder="Rest Interval (in seconds)"
                                style={styles.input}
                            />

                            {/* Submit and Cancel Buttons */}
                            <TouchableOpacity onPress={createWorkout} style={styles.modalButton}>
                                <Text style={styles.buttonText}>Submit</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.modalButton}>
                                <Text style={styles.buttonText}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </KeyboardAvoidingView>

                </Modal>

            
        </ScrollView>
        <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
            <Text style={styles.buttonText}>Create New Workout</Text>
        </TouchableOpacity>

        
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.7)' 
    },
    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%',
      },
    container: {
        flex: 1,
        padding: 20,

    },
    workoutContainer: {
        marginVertical: 10,
        padding: 10,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor:'white'
    },
    workoutImage: {
        width: '100%',
        height: 150,
        borderRadius: 10,
    },
    workoutTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10,
    },
    workoutDescription: {
        fontSize: 14,
        color: '#888',
        marginTop: 5,
    },
    workoutDetail: {
        fontSize: 14,
        marginTop: 5,
    },
    addButton: {
        backgroundColor: '#48BF91',
        padding: 15,
        borderRadius: 7,
        alignItems: 'center',
        marginVertical: 20,
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
      centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 72,

    },
    
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        width: '80%',  // You can adjust this value
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
        width: '100%',
        padding: 10,
        marginVertical: 8,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
    },
    
    modalButton: {
        backgroundColor: '#48BF91',
        padding: 10,
        marginVertical: 5,
        borderRadius: 7,
        alignItems: 'center',
        width: '100%',
    },
    
    
});


export default WorkoutManagementScreen;
