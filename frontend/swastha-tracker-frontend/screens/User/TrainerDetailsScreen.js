import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList,Image,ImageBackground, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useUser } from '../../context/UserContext';

const TrainerDetailsScreen = ({ route, navigation }) => {
    const { user, setUser } = useUser();
  const { trainerId } = route.params;
  const [trainerDetails, setTrainerDetails] = useState({});
  const [displayMode, setDisplayMode] = useState('workout');

  const handleLogout = () => {
    navigation.navigate('LoginScreen');
  };

  useEffect(() => {
    const fetchTrainerDetails = async () => {
      const token = await AsyncStorage.getItem('userToken');

      try {
        const response = await fetch(`http://192.168.29.28:8000/users/trainers/${trainerId}/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`,
            },
        });

        const data = await response.json();
        setTrainerDetails(data);
      } catch (error) {
        console.error("Failed fetching trainer details:", error);
      }
    };

    fetchTrainerDetails();
  }, [trainerId]);



  const selectWorkout = async (workoutId) => {
    const token = await AsyncStorage.getItem('userToken');
  
    try {
      const response = await fetch('http://192.168.29.28:8000/users/select_workout/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`,
        },
        body: JSON.stringify({ workout_id: workoutId })
      });
  
      const data = await response.json();
      if (data.success) {
        alert(data.success);
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error("Failed to select workout:", error);
      alert("Failed to select workout.");
    }
  };
  





  const selectNutrition = async (nutritionId) => {
    const token = await AsyncStorage.getItem('userToken');
  
    try {
      const response = await fetch('http://192.168.29.28:8000/users/select_nutrition/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`,
        },
        body: JSON.stringify({ nutrition_id: nutritionId })
      });
  
      const data = await response.json();
      if (data.success) {
        alert(data.success);
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error("Failed to select nutrition plan:", error);
      alert("Failed to select nutrition plan.");
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
      <View style={styles.toggleButtons}>
        <TouchableOpacity onPress={() => setDisplayMode('profile')} style={[styles.toggleButton, displayMode === 'profile' ? styles.activeButton : {}]}>
          <Text>Trainer Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setDisplayMode('workout')} style={[styles.toggleButton, displayMode === 'workout' ? styles.activeButton : {}]}>
          <Text>Workouts</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setDisplayMode('nutrition')} style={[styles.toggleButton, displayMode === 'nutrition' ? styles.activeButton : {}]}>
          <Text>Nutrition</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
      {displayMode === 'profile' && (
        <View style={styles.profileContainer}>
            <Text style={styles.title}>Name: {trainerDetails.trainer.name}</Text>
            <Text style={styles.detail}>Bio: {trainerDetails.trainer.bio}</Text>
            <Text style={styles.detail}>Age: {trainerDetails.trainer.age}</Text>
            <Text style={styles.detail}>Gender: {trainerDetails.trainer.gender}</Text>
            <Text style={styles.detail}>Specialization: {trainerDetails.trainer.specialization}</Text>
            <Text style={styles.detail}>Experience: {trainerDetails.trainer.experience} years</Text>
            <Text style={styles.detail}>Contact: {trainerDetails.trainer.contact_number}</Text>
        </View>
        )}


        {displayMode === 'workout' && (
        <FlatList 
            data={trainerDetails.workouts}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
            <View style={styles.itemContainer}>
                <Image source={require('../../assets/goal.jpeg')} style={styles.itemImage} />
                <View>
                <Text style={styles.itemTitle}>{item.title}</Text>
                <Text style={styles.itemDetail}>Description: {item.description}</Text>
                <Text style={styles.itemDetail}>Duration: {item.duration} mins</Text>
                <Text style={styles.itemDetail}>Exercises: {item.exercises}</Text>
                <Text style={styles.itemDetail}>Sets: {item.sets}</Text>
                <Text style={styles.itemDetail}>Reps per Set: {item.reps_per_set}</Text>
                <Text style={styles.itemDetail}>Rest Interval: {item.rest_interval}</Text>
                <TouchableOpacity style={styles.selectButton} onPress={() => selectWorkout(item.id)}>
                    <Text>Select</Text>
                </TouchableOpacity>
                </View>
            </View>
            )}
        />
        )}


                {displayMode === 'nutrition' && (
                <FlatList 
                    data={trainerDetails.nutrition_plans}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                    <View style={styles.itemContainer}>
                        <Image source={require('../../assets/nutri.jpg')} style={styles.itemImage} />
                        <View>
                        <Text style={styles.itemTitle}>{item.name}</Text>
                        <Text style={styles.itemDetail}>Description: {item.description}</Text>
                        <Text style={styles.itemDetail}>Daily Calories: {item.daily_calories} kcal</Text>
                        <Text style={styles.itemDetail}>Daily Protein: {item.daily_protein} grams</Text>
                        <Text style={styles.itemDetail}>Daily Carbs: {item.daily_carbs} grams</Text>
                        <Text style={styles.itemDetail}>Daily Fats: {item.daily_fats} grams</Text>
                        <TouchableOpacity style={styles.selectButton} onPress={() => selectNutrition(item.id)}>
                            <Text>Select</Text>
                        </TouchableOpacity>
                        </View>
                    </View>
                    )}
                />
                )}

      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc'
  }
  ,
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
  toggleButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc'
  },
  toggleButton: {
    padding: 10,
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5
  },
  activeButton: {
    backgroundColor: '#ddd'
  },
  profileContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    shadowOpacity: 0.25,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
    marginBottom: 20
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10
  },
  detail: {
    fontSize: 16,
    marginBottom: 8
  },
  itemContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    shadowOpacity: 0.25,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
    marginBottom: 20,
    flexDirection: 'column',
    alignItems: 'center',
    
  },
  itemImage: {
    width: 80,
    height: 80,
    marginRight: 15,
    borderRadius: 40
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8
  },
  itemDetail: {
    fontSize: 16,
    marginBottom: 4,
  },
  selectButton: {
    backgroundColor: '#007BFF',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 5,
    marginTop: 10,
    width:75,
    color:'white'
  }
  
});

export default TrainerDetailsScreen;
