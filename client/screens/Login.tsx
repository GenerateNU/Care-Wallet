import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { logIn } from '../services/auth/login';
import { signUp } from '../services/auth/signup';
import {
  useNavigation,
  StackActions,
  useRoute
} from '@react-navigation/native';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();
  const route = useRoute();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Email and password are required');
      return;
    }
    const result = await logIn(email, password);
    if (typeof result === 'string') {
      Alert.alert('Login Failed', result.substring(5).replaceAll('-', ' '));
    } else {
      Alert.alert('Login Success', 'Welcome back!');
      // console.log('result: ', result);
      navigation.navigate('BottomNav');
    }
  };

  const handleSignUp = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Email and password are required');
      return;
    }
    const result = await signUp(email, password);
    if (typeof result === 'string') {
      Alert.alert('Signup Failed', result.substring(5).replaceAll('-', ' '));
    } else {
      Alert.alert('Signup Success', 'Welcome to the app!');
      // console.log('result: ', result);
      navigation.navigate('BottomNav');
    }
  };

  return (
    <View className="flex-1 justify-center items-center px-5">
      <TextInput
        className="w-full my-2.5 py-2 px-3 border border-gray-300 rounded"
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        keyboardType="email-address"
      />
      <TextInput
        className="w-full my-2.5 py-2 px-3 border border-gray-300 rounded"
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

export default LoginPage;
