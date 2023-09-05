import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground,Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const WelcomeScreen = () => {
    const navigation = useNavigation();
  return (
    <ImageBackground source={require('../../assets/aa.jpg')} style={styles.backgroundImage}>
      <Image source={require('../../assets/logo.png')}style={styles.logo}></Image>
      <View style={styles.container}>
        
        {/* <Text style={styles.title}>Swastha Tracker</Text> */}

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('LoginScreen')}>
          <Text style={styles.buttonText}>I'm a User</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('TrainerLoginScreen')}>
          <Text style={styles.buttonText}>I'm a Trainer</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 60,
    textShadowColor: 'rgba(0, 0, 0, 0.7)', // optional shadow for the text
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  button: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Slightly transparent white
    padding: 15,
    marginVertical: 10,
    borderRadius: 25,
    width: '70%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#48BF91',
    fontSize: 22,
  },
  logo:{
    marginTop:30,
    
  }
});

export default WelcomeScreen;
