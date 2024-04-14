import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';

import { onAuthStateChanged } from '@firebase/auth';
import { useNavigation } from '@react-navigation/native';
import Constants from 'expo-constants';

import Carewallet from '../../assets/Carewallet.svg';
import { auth } from '../../firebase.config';
import { MainLayout } from '../../layouts/MainLayout';
import { AppStackNavigation } from '../../navigation/types';
import { registerForPushNotificationsAsync } from '../../services/notifications';

export default function Dashboard() {
  const navigation = useNavigation<AppStackNavigation>();
  const [expoPushToken, setExpoPushToken] = useState('');

  useEffect(() => {
    console.log(Constants.easConfig?.projectId); // --> undefined
    console.log(Constants.expoConfig?.extra?.eas.projectId); // --> my project id

    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token!)
    );

    console.log(expoPushToken); // this is here until we send to backend
  }, []);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      navigation.navigate('Main');
      return;
    }

    navigation.navigate('Dashboard');
  });
  return (
    <MainLayout>
      <View className="h-[90vh] items-center justify-center">
        <View className="flex-center mb-10 items-center">
          <Carewallet className="h-20 w-20" />
        </View>
        <Text className="font-carewallet-manrope-extrabold text-4xl text-carewallet-blue">
          Care-Wallet
        </Text>
        <View
          className="mt-4 h-[40px] w-[70vw] items-center justify-center rounded-lg bg-carewallet-blue"
          onTouchEnd={() => navigation.navigate('Login')}
        >
          <Text className="font-carewallet-manrope-semibold text-carewallet-white">
            Login
          </Text>
        </View>
        <View
          className="mt-4 h-[40px] w-[70vw] items-center justify-center rounded-lg border border-carewallet-lightgray bg-carewallet-white"
          onTouchEnd={() => navigation.navigate('Register')}
        >
          <Text className="font-carewallet-manrope-semibold text-carewallet-blue">
            Sign up
          </Text>
        </View>
      </View>
    </MainLayout>
  );
}
