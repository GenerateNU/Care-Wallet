import React from 'react';
import { SafeAreaView, Text, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { Header } from '../components/home/Header';
import { TaskList } from '../components/home/TaskList';
import { HealthStats } from '../components/profile/HealthStats';
import { useCareWalletContext } from '../contexts/CareWalletContext';
import { AppStackNavigation } from '../navigation/types';
import { useUser } from '../services/user';

export default function Home() {
  const { user: signedInUser } = useCareWalletContext();
  const { user } = useUser(signedInUser.userID);
  const navigation = useNavigation<AppStackNavigation>();

  return (
    <SafeAreaView className="flex-1 bg-carewallet-white">
      <View className="ml-5 mt-8 w-[90vw] flex-1 bg-carewallet-white">
        <Header user={user} />
        <TaskList />
        <View className="mt-5 h-[20vh] rounded-lg border border-carewallet-blue/10 bg-carewallet-blue/10">
          <Text className="ml-5 mt-5 font-carewallet-manrope-semibold text-lg">
            Health Overview
          </Text>
          <HealthStats />
        </View>
        <View className="mt-10 overflow-hidden rounded-lg border border-carewallet-blue/10">
          <View
            className="flex flex-row items-center overflow-hidden bg-carewallet-blue/10"
            onTouchEnd={() => {
              navigation.navigate('TaskList');
            }}
          >
            <Text className="py-2 pl-2 font-carewallet-manrope-semibold text-sm text-carewallet-blue">
              Notifications
            </Text>
          </View>

          <View className="h-10 items-center justify-center">
            <Text className="ml-2 font-carewallet-manrope text-sm">
              You have no recent notifications.
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
