import React, { useState } from 'react';
import { Alert, Button, TextInput, View } from 'react-native';

import { onAuthStateChanged } from '@firebase/auth';
import { useNavigation } from '@react-navigation/native';

import { auth } from '../firebase.config';
import { AppStackNavigation } from '../navigation/AppNavigation';
import { useAuth } from '../services/auth';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { logInMutation, signUpMutation } = useAuth();

  const navigation = useNavigation<AppStackNavigation>();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      navigation.navigate('Main');
      return;
    }

    navigation.navigate('Login');
  });

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Email and password are required');
      return;
    }

    logInMutation({ email, password });
  };

  const handleSignUp = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Email and password are required');
      return;
    }

    signUpMutation({ email, password });
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
}
