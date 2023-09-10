import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';

const UserRegister = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [password,setPassword] = useState('');

  const handleRegister = async () => {
    const data = {
      email,
      name,
      age,
      gender,
      height,
      weight,
      contact_number: contactNumber,
      password,
    };
  
    try {
      const response = await fetch('https://swastha-tracker-app.onrender.com/users/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      const result = await response.json();
  
      if (response.status === 200 || response.status === 201) {
        navigation.navigate('LoginScreen');
        alert('Registered successfully!');
      } else {
        alert(result.message || 'Registration failed. Please try again.');
      }
    } catch (error) {
      console.log(error);
      alert('An unexpected error occurred. Please try again.');
    }
  };
  

  return (
    <ImageBackground source={require('../../assets/welcome.png')} style={styles.backgroundImage}>
      <View style={styles.container}>
        <Text style={styles.title}>User Registration</Text>

        <TextInput 
          style={styles.input} 
          placeholder="Email"
          value={email} 
          onChangeText={setEmail} 
        />
        <TextInput 
          style={styles.input} 
          placeholder="Name" 
          value={name}
          onChangeText={setName}
        />
        <TextInput 
          style={styles.input}
          placeholder="Age"
          value={age}
          onChangeText={setAge}
          keyboardType="numeric"
        />
        <TextInput 
          style={styles.input}
          placeholder="Gender"
          value={gender}
          onChangeText={setGender}
        />
        <TextInput 
          style={styles.input}
          placeholder="Height"
          value={height}
          onChangeText={setHeight}
          keyboardType="numeric"
        />
        <TextInput 
          style={styles.input}
          placeholder="Weight"
          value={weight}
          onChangeText={setWeight}
          keyboardType="numeric"
        />
        <TextInput 
          style={styles.input}
          placeholder="Contact Number"
          value={contactNumber}
          onChangeText={setContactNumber}
          keyboardType="phone-pad"
        />
        <TextInput 
          style={styles.input} 
          placeholder="Password"
          value={password} 
          onChangeText={setPassword} 
        />
        
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
          <Text style={styles.link}>Already have an account? Login</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
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
    backgroundColor: 'white',
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

export default UserRegister;
