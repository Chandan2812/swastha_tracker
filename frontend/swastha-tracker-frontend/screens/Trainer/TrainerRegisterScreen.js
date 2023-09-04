import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';

const TrainerRegister = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [experience, setExperience] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    // Handle API call to register the trainer here
  };

  return (
    <ImageBackground source={require('../../assets/welcome.png')} style={styles.backgroundImage}>
      <View style={styles.container}>
        <Text style={styles.title}>Trainer Registration</Text>
        <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} />
        <TextInput style={styles.input} placeholder="Name" value={name} onChangeText={setName} />
        <TextInput style={styles.input} placeholder="Age" value={age} onChangeText={setAge} />
        <TextInput style={styles.input} placeholder="Gender" value={gender} onChangeText={setGender} />
        <TextInput style={styles.input} placeholder="Specialization" value={specialization} onChangeText={setSpecialization} />
        <TextInput style={styles.input} placeholder="Experience" value={experience} onChangeText={setExperience} />
        <TextInput style={styles.input} placeholder="Contact Number" value={contactNumber} onChangeText={setContactNumber} />
        <TextInput style={styles.input} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
        
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('TrainerLoginScreen')}>
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
    borderColor: '#ccc',
    borderRadius: 7,
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Slightly transparent white
  },
  button: {
    backgroundColor: '#48BF91',
    padding: 15,
    borderRadius: 7,
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
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

export default TrainerRegister;
