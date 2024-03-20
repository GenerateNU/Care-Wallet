import React from 'react';
import { Text, View } from 'react-native';

import { RouteProp, useRoute } from '@react-navigation/native';
import {
  GestureHandlerRootView,
  ScrollView
} from 'react-native-gesture-handler';

import { BackButton } from '../components/nav_buttons/BackButton';
import { AddressComponent } from '../components/task_creation/AddressComponent.tsx';
import { RadioGroup } from '../components/task_creation/RadioGroup.tsx';
import { TextInputLine } from '../components/task_creation/TextInputLine.tsx';
import { TextInputParagraph } from '../components/task_creation/TextInputParagraph.tsx';
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

  const compList: { key: string; value: string }[] = [];

  body?.forEach((item) => {
    Object.entries(item).forEach(([key, value]) => {
      compList.push({ key, value });
    });
  });

  return (
    <GestureHandlerRootView>
      <ScrollView>
        <View className="flex w-full flex-row items-center justify-center">
          <View className="mr-[95px]">
            <BackButton />
          </View>
          <Text className="mr-auto self-center text-center text-carewallet-gray">
            Step 1 of 2
          </Text>
        </View>
        <Text className="text-center text-2xl font-bold">{header}</Text>

        {compList.map((item, index) => (
          <View key={index}>
            {item.key === 'Address' && <AddressComponent />}
            {item.value === 'TextInputLine' && (
              <TextInputLine title={item.key} />
            )}
            {item.value === 'TextInputParagraph' && (
              <TextInputParagraph title={item.key} />
            )}
            {item.value.startsWith('Radio Group') && (
              <RadioGroup
                title={item.key}
                options={item.value.substring(12).split(', ')}
              />
            )}
          </View>
        ))}
      </ScrollView>
    </GestureHandlerRootView>
  );
}
