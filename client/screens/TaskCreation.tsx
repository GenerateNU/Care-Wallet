import React from 'react';
import { Text, View } from 'react-native';

import { RouteProp, useRoute } from '@react-navigation/native';

import { BackButton } from '../components/nav_buttons/BackButton';
import { AddressComponent } from '../components/task_creation/AddressComponent.tsx';
import { TaskCreationJson } from '../types/task-creation-json.ts';

type ParamList = {
  mt: {
    taskType: string;
  };
};

export function TaskCreation() {
  const route = useRoute<RouteProp<ParamList, 'mt'>>();
  const { taskType } = route.params;
  const header = TaskCreationJson.types.find((t) =>
    taskType.includes(t.Header)
  )?.Header;
  const body = TaskCreationJson.types.find((t) =>
    taskType.includes(t.Header)
  )?.Body;
  console.log(body);

  return (
    <View className="mt-10">
      <View className="flex w-full flex-row items-center justify-center">
        <View className="mr-[95px]">
          <BackButton />
        </View>
        <Text className="mr-auto self-center text-center text-carewallet-gray">
          Step 1 of 2
        </Text>
      </View>
      <AddressComponent />
      <Text className="text-center text-2xl font-bold">{header}</Text>
    </View>
  );
}
