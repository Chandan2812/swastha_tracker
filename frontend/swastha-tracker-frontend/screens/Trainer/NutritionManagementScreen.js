import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, Alert, ImageBackground, TextInput, Modal, KeyboardAvoidingView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTrainer } from '../../context/TrainerContext';

const NutritionManagementScreen = ({ navigation }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [dailyCalories, setDailyCalories] = useState('');
    const [dailyProtein, setDailyProtein] = useState('');
    const [dailyCarbs, setDailyCarbs] = useState('');
    const [dailyFats, setDailyFats] = useState('');

    const [nutritionPlans, setNutritionPlans] = useState([]);

    const { trainer } = useTrainer();

    const handleLogout = () => {
        navigation.navigate('TrainerLoginScreen');
    };

    useEffect(() => {
        fetchNutritionPlans();
    }, []);

    const fetchNutritionPlans = async () => {
        const token = await AsyncStorage.getItem('trainerToken');

        try {
            const response = await fetch('http://192.168.29.28:8000/trainers/nutrition/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`,
                },
            });

            const result = await response.json();

            if (response.status === 200) {
                setNutritionPlans(result);
            } else {
                Alert.alert('Error', 'Failed to fetch nutrition plans.');
            }
        } catch (error) {
            Alert.alert('Error', 'An unexpected error occurred.');
        }
    };

    const createNutritionPlan = async () => {
        const token = await AsyncStorage.getItem('trainerToken');
        
        const data = {
            trainer: trainer.id,
            name,
            description,
            daily_calories: parseInt(dailyCalories),
            daily_protein: parseInt(dailyProtein),
            daily_carbs: parseInt(dailyCarbs),
            daily_fats: parseInt(dailyFats),
        };

        try {
            const response = await fetch('http://192.168.29.28:8000/trainers/nutrition/create/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`,
                },
                body: JSON.stringify(data),
            });

            if (response.status === 201) {
                Alert.alert('Success', 'Nutrition plan created successfully!');
                setModalVisible(false);
                fetchNutritionPlans();
            } else {
                const result = await response.json();
                Alert.alert('Error', result.error || 'Failed to create nutrition plan.');
            }
        } catch (error) {
            console.log(error);
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
                {nutritionPlans.map(nutritionPlan => (
                    <View key={nutritionPlan.id} style={styles.nutritionPlanContainer}>
                        <Image source={require('../../assets/nutri.jpg')} style={styles.workoutImage} />
                        <Text style={styles.nutritionPlanTitle}>{nutritionPlan.name}</Text>
                        <Text style={styles.nutritionPlanDescription}>{nutritionPlan.description}</Text>
                        <Text style={styles.nutritionPlanDetail}>Daily Calories: {nutritionPlan.daily_calories} kcal</Text>
                        <Text style={styles.nutritionPlanDetail}>Daily Protein: {nutritionPlan.daily_protein} grams</Text>
                        <Text style={styles.nutritionPlanDetail}>Daily Carbs: {nutritionPlan.daily_carbs} grams</Text>
                        <Text style={styles.nutritionPlanDetail}>Daily Fats: {nutritionPlan.daily_fats} grams</Text>
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
                            {/* Name */}
                            <TextInput
                                value={name}
                                onChangeText={setName}
                                placeholder="Name"
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

                            {/* Daily Calories */}
                            <TextInput
                                value={dailyCalories}
                                onChangeText={setDailyCalories}
                                placeholder="Daily Calories (in kcal)"
                                keyboardType="numeric"
                                style={styles.input}
                            />

                            {/* Daily Protein */}
                            <TextInput
                                value={dailyProtein}
                                onChangeText={setDailyProtein}
                                placeholder="Daily Protein (in grams)"
                                keyboardType="numeric"
                                style={styles.input}
                            />

                            {/* Daily Carbs */}
                            <TextInput
                                value={dailyCarbs}
                                onChangeText={setDailyCarbs}
                                placeholder="Daily Carbs (in grams)"
                                keyboardType="numeric"
                                style={styles.input}
                            />

                            {/* Daily Fats */}
                            <TextInput
                                value={dailyFats}
                                onChangeText={setDailyFats}
                                placeholder="Daily Fats (in grams)"
                                keyboardType="numeric"
                                style={styles.input}
                            />

                            {/* Submit and Cancel Buttons */}
                            <TouchableOpacity onPress={createNutritionPlan} style={styles.modalButton}>
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
                <Text style={styles.buttonText}>Create New Nutrition Plan</Text>
            </TouchableOpacity>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.7)' 
    },
    nutritionPlanContainer: {
        marginVertical: 10,
        padding: 10,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: 'white',
    },
    nutritionPlanTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10,
    },
    nutritionPlanDescription: {
        fontSize: 14,
        color: '#888',
        marginTop: 5,
    },
    nutritionPlanDetail: {
        fontSize: 14,
        marginTop: 5,
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

export default NutritionManagementScreen;
