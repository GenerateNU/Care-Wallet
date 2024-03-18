import React, { useState } from 'react';
import { Alert, Pressable, Text, TextInput, View } from 'react-native';

import { onAuthStateChanged } from '@firebase/auth';
import { useNavigation } from '@react-navigation/native';

import { auth } from '../firebase.config';
import { AppStackNavigation } from '../navigation/types';
import { useAuth } from '../services/auth';
import Constants from 'expo-constants';
import {
  registerForPushNotificationsAsync,
} from '../services/notifications';
import { AppStackNavigation } from '../navigation/AppNavigation';
import { useAuth } from '../services/auth';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { logInMutation, signUpMutation } = useAuth();
  const [expoPushToken, setExpoPushToken] = useState('');
  const navigation = useNavigation<AppStackNavigation>();

  useEffect(() => {
    console.log(Constants.easConfig?.projectId); // --> undefined
    console.log(Constants.expoConfig?.extra?.eas.projectId); // --> my project id

    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token!)
    );, []);


  const navigation = useNavigation<AppStackNavigation>();


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
    <View className="flex-1 items-center justify-center px-5">
      <TextInput
        className="my-2.5 w-full rounded border border-carewallet-lightgray px-3 py-2"
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        keyboardType="email-address"
      />
      <TextInput
        className="my-2.5 w-full rounded border border-carewallet-lightgray px-3 py-2"
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry
      />
      <Pressable
        onPress={handleLogin}
        className="mb-2 w-20 self-center rounded-md border border-carewallet-gray"
      >
        <Text className="self-center text-lg text-carewallet-gray">Log In</Text>
      </Pressable>
      <Pressable
        onPress={handleSignUp}
        className="w-20 self-center rounded-md border border-carewallet-gray"
      >
        <Text className="self-center text-lg text-carewallet-gray">
          Sign Up
        </Text>
      </Pressable>
    </View>
  );
}
