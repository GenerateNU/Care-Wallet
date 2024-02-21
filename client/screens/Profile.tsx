import React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';

import { Group } from '../components/profile/group';
import { Header } from '../components/profile/header';
import { useCareWalletContext } from '../contexts/CareWalletContext';
import { useUser } from '../services/user';

export default function Profile() {
  const { user: carewalletUser } = useCareWalletContext();
  const { user, userIsLoading } = useUser(carewalletUser.userID);

  if (userIsLoading) {
    return (
      <View className="w-[100vw] flex-1 items-center justify-center bg-carewallet-white text-3xl">
        <ActivityIndicator size="large" />
        <Text>Loading...</Text>
      </View>
    );
  }

  if (!user) {
    return (
      <View className="w-[100vw] flex-1 items-center justify-center bg-carewallet-white text-3xl">
        <Text className="text-xl">Could Not Load Profile...</Text>
      </View>
    );
  }

  return (
    <View className="flex flex-1 flex-col">
      <Header user={user} />
      <Group />
    </View>
  );
}
