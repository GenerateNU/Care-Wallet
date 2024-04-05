import React, { useState } from 'react';
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
import { TaskTitleToColorMap } from '../types/type.ts';

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

  const [values, setValues] = useState<{ [key: string]: string }>({});
  const handleChange = (key: string, value: string) => {
    setValues((prevValues) => ({
      ...prevValues,
      [key]: value
    }));
    console.log('Current values:', values);
  };

  const themeColor = TaskTitleToColorMap[header as string];
  console.log('Header:', header);
  console.log('Theme color:', themeColor);

  return (
    <GestureHandlerRootView className="bg-carewallet-white pt-10">
      <View className="flex w-full flex-row items-center">
        <BackButton />
        <Text
          className={`text-${themeColor} mx-auto pr-20 font-carewallet-manrope-bold text-[18px]`}
        >
          Step 2 of 3
        </Text>
      </View>
      <View className="my-3 border-b border-carewallet-lightgray" />

      {/* add background svg */}
      <ScrollView className="mt-3">
        <Text
          className={`mx-5 font-carewallet-manrope-bold text-2xl font-bold text-${themeColor}`}
        >
          {header}
        </Text>
        {compList.map((item, index) => (
          <View key={index}>
            {item.key === 'Address' && <AddressComponent />}
            {item.value === 'TextInputLine' && (
              <TextInputLine
                title={item.key}
                onChange={(value) => handleChange(item.key, value)}
              />
            )}
            {item.value === 'TextInputParagraph' && (
              <TextInputParagraph
                title={item.key}
                onChange={(value) => handleChange(item.key, value)}
              />
            )}
            {item.value.startsWith('RadioGroup') && (
              <RadioGroup
                title={item.key}
                options={item.value.substring(12).split(', ')}
                onChange={(value) => handleChange(item.key, value)}
              />
            )}
          </View>
        ))}
      </ScrollView>
    </GestureHandlerRootView>
  );
}
