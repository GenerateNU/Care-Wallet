import React, { useState } from 'react';
import { Text, View } from 'react-native';

import { RouteProp, useRoute } from '@react-navigation/native';
import {
  GestureHandlerRootView,
  ScrollView
} from 'react-native-gesture-handler';

import MedicationBg from '../assets/task-creation/big-bg-med.svg';
import { BackButton } from '../components/nav_buttons/BackButton';
import { AddressComponent } from '../components/task_creation/AddressComponent';
import { RadioGroup } from '../components/task_creation/RadioGroup';
import { TextInputLine } from '../components/task_creation/TextInputLine';
import { TextInputParagraph } from '../components/task_creation/TextInputParagraph';
import { TaskCreationJson } from '../types/task-creation-json';

const TaskTitleToColorMap: { [key: string]: string } = {
  'Medication Management': 'carewallet-pink',
  'Physician Appointments': 'carewallet-pink',
  Grooming: 'carewallet-purple',
  'Family Conversations': 'carewallet-purple',
  'Shopping & Errands': 'carewallet-purple',
  'Pay Bills': 'carewallet-purple',
  Diet: 'carewallet-yellow',
  Activities: 'carewallet-yellow',
  'Health Insurance': 'carewallet-green',
  Other: 'carewallet-coral'
};

type ParamList = {
  mt: {
    taskType: string;
  };
};

export default function TaskCreation() {
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
    <GestureHandlerRootView className="relative">
      <View className="absolute flex w-full flex-row items-center bg-carewallet-white">
        <BackButton />
        <Text
          className={`mx-auto pr-20 font-carewallet-manrope-bold text-[18px] text-carewallet-blue`}
        >
          Step 2 of 3
        </Text>
      </View>
      <View className="absolute top-16 w-full border-t border-carewallet-gray" />

      <MedicationBg />
      <ScrollView className="absolute top-20 mt-3 min-h-full min-w-full">
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
