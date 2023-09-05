import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useUser } from '../../context/UserContext';



const UserLogin = ({ navigation }) => {
  const { setUser } = useUser();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const data = {
      email,
      password,
    };
  
    try {
      const response = await fetch('http://192.168.29.28:8000/users/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      const result = await response.json();
  
      if (response.status === 200 || response.status === 201) {
        // You can store the token here using AsyncStorage or another method.
        AsyncStorage.setItem('userToken', result.token);
        setUser(result.user);
        console.log(result.user)
        setEmail('')
        setPassword("")
        alert('Login successfully!');
        navigation.navigate('UserDashboardScreen');
      } else {
        alert(result.error || 'Login failed. Please try again.');
      }
    } catch (error) {
      console.log(error)
      alert('An unexpected error occurred. Please try again.');
    }
};


  return (
    <ImageBackground source={require('../../assets/welcome.png')} style={styles.backgroundImage}>
    <View style={styles.container}>
      <Text style={styles.title}>User Login</Text>
      <TextInput 
        style={styles.input} 
        placeholder="Email" 
        value={email} 
        onChangeText={setEmail} 
      />
      <TextInput 
        style={styles.input} 
        placeholder="Password" 
        value={password} 
        onChangeText={setPassword} 
        secureTextEntry 
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('RegisterScreen')}>
        <Text style={styles.link}>Don't have an account? Register</Text>
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
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#48BF91',
  },
  input: {
    width: '100%',
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 7,
    backgroundColor:'white',
  },
  button: {
    backgroundColor: '#48BF91',
    padding: 15,
    borderRadius: 7,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  link: {
    marginTop: 15,
    color: '#48BF91',
    textDecorationLine: 'underline',
  }
});

export default UserLogin;
