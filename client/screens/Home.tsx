import React from 'react';
import { Text, View } from 'react-native';

import { Header } from '../components/home/Header';
import { TaskList } from '../components/home/TaskList';
import { useCareWalletContext } from '../contexts/CareWalletContext';
import { MainLayout } from '../layouts/MainLayout';
import { useUser } from '../services/user';

export default function Home() {
  const { user: signedInUser } = useCareWalletContext();
  const { user } = useUser(signedInUser.userID);

  return (
    <MainLayout>
      <View className="mx-auto mt-10 w-[90vw]">
        <Header user={user} />
        <TaskList />
      </View>
      <View className="mx-auto mt-5 h-[20vh] w-[90vw] bg-carewallet-white">
        <View className="mx-auto h-[20vh] w-[90vw] rounded-lg border border-carewallet-blue/10 bg-carewallet-blue/10">
          <Text className="ml-5 mt-5 font-carewallet-montserrat-bold text-base">
            Health Overview
          </Text>
          <Text className="my-auto text-center">
            There are no health stats to view.
          </Text>
        </View>
      </View>
      <View className="mx-auto mt-2 w-[90vw] bg-carewallet-white">
        <View className="w-[90vw] overflow-hidden rounded-lg border border-carewallet-blue/10">
          <View className="h-10 items-center justify-center">
            <Text className="ml-2 font-carewallet-manrope text-sm">
              You have no recent notifications.
            </Text>
          </View>
        </View>
      </View>
    </MainLayout>
  );
}
