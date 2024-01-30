import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { logIn } from '../services/auth/login';
import { signUp } from '../services/auth/signup';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Email and password are required');
      return;
    }
    const result = await logIn(email, password);
    if (!result) {
      Alert.alert('Login Failed', 'Invalid email or password');
    } else {
      Alert.alert('Login Success', 'Welcome back!');
    }
  };

  const handleSignUp = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Email and password are required');
      return;
    }
    const result = await signUp(email, password);
    if (!result) {
      Alert.alert('Signup Failed', 'Invalid email or password');
    } else {
      Alert.alert('Signup Success', 'Welcome to the app!');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} />
      <Button title="Sign Up" onPress={handleSignUp} />
    </View>
  );
};

// Add styles - needed it just to see the board lol
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', // Align children vertically in the center
    alignItems: 'center', // Align children horizontally in the center
    padding: 20
  },
  input: {
    width: '100%', // Make input take full width of the container
    marginVertical: 10 // Add vertical margin for spacing
  }
});

export default LoginPage;
