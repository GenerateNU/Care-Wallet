import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, View } from 'react-native';

import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { clsx } from 'clsx';
import {
  GestureHandlerRootView,
  ScrollView
} from 'react-native-gesture-handler';

import FinancialBg from '../assets/task-creation/financial-bg.svg';
import HealthBg from '../assets/task-creation/health-bg.svg';
import HomeBg from '../assets/task-creation/home-bg.svg';
import OtherBg from '../assets/task-creation/other-bg.svg';
import PersonalBg from '../assets/task-creation/personal-bg.svg';
import { BackButton } from '../components/nav_buttons/BackButton';
import { ForwardButton } from '../components/nav_buttons/ForwardButton';
import { AddressComponent } from '../components/task_creation/AddressComponent';
import { RadioGroup } from '../components/task_creation/RadioGroup';
import { TextInputLine } from '../components/task_creation/TextInputLine';
import { TextInputParagraph } from '../components/task_creation/TextInputParagraph';
import { AppStackNavigation } from '../navigation/types';
import { TaskCreationJson } from '../types/task-creation-json';

const TaskTitleToColorMap: { [key: string]: string } = {
  'Medication Management': 'text-carewallet-pink',
  'Physician Appointments': 'text-carewallet-pink',
  Grooming: 'text-carewallet-purple',
  'Family Conversations': 'text-carewallet-purple',
  'Shopping & Errands': 'text-carewallet-purple',
  'Pay Bills': 'text-carewallet-purple',
  Diet: 'text-carewallet-yellow',
  Activities: 'text-carewallet-yellow',
  'Health Insurance': 'text-carewallet-green',
  Other: 'text-carewallet-coral'
};

type ParamList = {
  mt: {
    taskType: string;
  };
};

export default function TaskCreation() {
  const route = useRoute<RouteProp<ParamList, 'mt'>>();
  const navigation = useNavigation<AppStackNavigation>();
  const { taskType } = route.params;
  const header = TaskCreationJson.types.find((t) =>
    taskType.includes(t.Header)
  )?.Header;

  const [themeColor, setThemeColor] = useState(
    TaskTitleToColorMap[header as string]
  );

  useEffect(() => {
    setThemeColor(TaskTitleToColorMap[header as string]);
  }, [header]);

  const renderBackground = (header: string) => {
    switch (header) {
      case 'Medication Management':
        return <HealthBg />;
      case 'Physician Appointments':
        return <HealthBg />;
      case 'Grooming':
        return <PersonalBg />;
      case 'Family Conversations':
        return <PersonalBg />;
      case 'Shopping & Errands':
        return <PersonalBg />;
      case 'Pay Bills':
        return <FinancialBg />;
      case 'Diet':
        return <HomeBg />;
      case 'Activities':
        return <HomeBg />;
      case 'Health Insurance':
        return <FinancialBg />;
      case 'Other':
        return <OtherBg />;
      default:
        return null;
    }
  };

  const body = TaskCreationJson.types.find((t) =>
    taskType.includes(t.Header)
  )?.Body;

  const compList: { key: string; value: string }[] = [];
  body?.forEach((item) => {
    Object.entries(item).forEach(([key, value]) => {
      compList.push({ key, value });
    });
  });

  const [values, setValues] = useState<{ [key: string]: string }>({
    Type: header ?? ''
    // TODO: Add value for task category
  });
  const handleChange = (key: string, value: string) => {
    setValues((prevValues) => ({
      ...prevValues,
      [key]: value
    }));
  };

  return (
    <SafeAreaView className="flex-1 bg-carewallet-white">
      <GestureHandlerRootView>
        <View className="flex w-full flex-row items-center border-b border-carewallet-gray bg-carewallet-white">
          <BackButton />
          <Text className="mx-auto my-7 pr-20 font-carewallet-manrope-bold text-lg text-carewallet-blue">
            Step 2 of 3
          </Text>
        </View>
        <View className="absolute -z-20">{renderBackground(header ?? '')}</View>
        <ScrollView className="mt-3 min-h-full min-w-full">
          <Text
            className={clsx(
              'mx-5 font-carewallet-manrope-bold text-2xl',
              themeColor
            )}
          >
            {header}
          </Text>
          {compList.map((item, index) => (
            <View key={index}>
              {/* TODO: implement on change for AddressComponent */}
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
                  options={item.value.substring(12).split(' ')}
                  onChange={(value) => handleChange(item.key, value)}
                />
              )}
            </View>
          ))}
          <View className="m-2 flex flex-row justify-end">
            <ForwardButton
              onPress={() => {
                navigation.navigate('AddTaskDetails', {
                  taskCreation: JSON.stringify(values)
                });
              }}
            />
          </View>
        </ScrollView>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
}
