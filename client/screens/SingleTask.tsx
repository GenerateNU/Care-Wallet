import React from 'react';
import { Text, View } from 'react-native';

import { BackButton } from '../components/BackButton';

export default function SingleTaskScreen() {
  return (
    <View className="flex flex-col items-start p-4">
      <View className="flex-row items-center">
        <BackButton />
      </View>
      <View className="mt-4">
        <Text className="text-base ">Label Here</Text>
      </View>
      <View className="mt-4">
        <Text className="text-base ">Category Here | Type of Task Here</Text>
      </View>
      <View className="mt-4">
        <Text className="text-black font-inter text-2xl font-bold">
          Doctor’s Appointment {'\n'} @ 8:00AM
        </Text>
      </View>
      <View className="mt-2">
        <Text className="text-black font-inter text-base font-normal">
          Description here. Description here. Description here. Description
          here. Description here. Description here. Description here.
          Description here. Description here. Description here. Description
          here.
        </Text>
      </View>
    </View>
  );
}
