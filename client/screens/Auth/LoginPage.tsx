import React, { useState } from 'react';
import { Alert, SafeAreaView, Text, TextInput, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import Carrie from '../../assets/Carie.svg';
import { MainLayout } from '../../layouts/MainLayout';
import { AppStackNavigation } from '../../navigation/types';
import { useAuth } from '../../services/auth';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { logInMutation } = useAuth();

  const navigation = useNavigation<AppStackNavigation>();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Email and password are required');
      return;
    }

    logInMutation({ email, password });
  };

  const handleSignUp = async () => {
    navigation.navigate('Register');
  };

  return (
    <MainLayout>
      <View className="h-[100vh]">
        <View className="mt-auto h-[60vh] w-[100vw] rounded-3xl bg-carewallet-white shadow-lg">
          <View className="absolute -top-16 left-8">
            <Carrie className="h-20 w-20" />
          </View>
          <SafeAreaView>
            <View className="mx-auto my-10 w-[80vw]">
              <Text className="mb-10 font-carewallet-manrope-bold text-xl text-carewallet-blue">
                Log in to your account
              </Text>
              <Text className="mr-auto mt-5 font-carewallet-manrope-bold text-2xs">
                EMAIL
              </Text>
              <TextInput
                className="my-2.5 w-full rounded border-b border-carewallet-lightgray py-2"
                value={email}
                onChangeText={setEmail}
                placeholder="email@email.com"
                keyboardType="email-address"
              />
              <Text className="mr-auto mt-5 font-carewallet-manrope-bold text-2xs">
                PASSWORD
              </Text>
              <TextInput
                className="my-2.5 w-full rounded border-b border-carewallet-lightgray py-2"
                value={password}
                onChangeText={setPassword}
                placeholder="1234"
                secureTextEntry
              />
            </View>
            <View className="mx-auto mb-8 mt-auto">
              <View
                onTouchEnd={handleLogin}
                className="mb-2 h-9 w-[80vw] items-center justify-center rounded-md bg-carewallet-blue"
              >
                <Text className="self-center font-carewallet-manrope-semibold text-base  text-carewallet-white">
                  Login
                </Text>
              </View>
              <View
                onTouchEnd={handleSignUp}
                className="h-9 w-[80vw] items-center justify-center self-center rounded-md border border-carewallet-lightgray"
              >
                <Text className="self-center font-carewallet-manrope-semibold text-base text-carewallet-blue">
                  Need to Register? Sign Up
                </Text>
              </View>
            </View>
          </SafeAreaView>
        </View>
      </View>
    </MainLayout>
  );
}
