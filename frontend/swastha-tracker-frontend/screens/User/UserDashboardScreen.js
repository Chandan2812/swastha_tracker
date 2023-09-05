import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView,ImageBackground, Image } from 'react-native';
import { useUser } from '../../context/UserContext';

const UserDashboardScreen = ({ navigation }) => {
  const { user,setUser } = useUser();
  const handleLogout = () => {
    setUser(null)
    navigation.navigate('LoginScreen');
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
      
      

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('UserProfileScreen')}>
          <Text style={styles.buttonText}>Profile Overview</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('TrainerSelectionScreen')}>
          <Text style={styles.buttonText}>Select a Trainer</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('GoalManagement')}>
          <Text style={styles.buttonText}>Manage Your Goals</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ProgressSection')}>
          <Text style={styles.buttonText}>View Progress</Text>
        </TouchableOpacity>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({

  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%'
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
    paddingLeft:20,
    paddingRight:20,
    // backgroundColor:'grey'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: 'white'
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
