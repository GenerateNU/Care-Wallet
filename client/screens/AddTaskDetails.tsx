import React, { useState } from 'react';
import { Text, View } from 'react-native';

import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import {
  GestureHandlerRootView,
  ScrollView
} from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

import { CWDropdown } from '../components/Dropdown';
import { BackButton } from '../components/nav_buttons/BackButton';
import { ForwardButton } from '../components/nav_buttons/ForwardButton';
import { RadioGroup } from '../components/task_creation/RadioGroup';
import { TextInputLine } from '../components/task_creation/TextInputLine';
import { TextInputParagraph } from '../components/task_creation/TextInputParagraph';
import { AppStackNavigation } from '../navigation/types';

enum RepeatOptions {
  NONE = 'NONE',
  DAILY = 'DAILY',
  WEEKLY = 'WEEKLY',
  MONTHLY = 'MONTHLY'
}

type ParamList = {
  mt: {
    taskCreation: string;
  };
};

export default function AddTaskDetails() {
  const route = useRoute<RouteProp<ParamList, 'mt'>>();
  const navigation = useNavigation<AppStackNavigation>();
  const { taskCreation } = route.params;
  console.log('Task Creation:', taskCreation);

  const [values, setValues] = useState<{ [key: string]: string }>({});
  const handleChange = (key: string, value: string) => {
    setValues((prevValues) => ({
      ...prevValues,
      [key]: value
    }));
  };

  const [repeat, setRepeat] = useState('NONE');
  const [label, setLabel] = useState('SELECT');
  const [assignedTo, setAssignedTo] = useState('SELECT');

  return (
    <SafeAreaView className="flex-1 bg-carewallet-white">
      <GestureHandlerRootView>
        <View className="flex w-full flex-row items-center border-b border-carewallet-gray bg-carewallet-white">
          <BackButton />
          <Text className="mx-auto my-7 pr-20 font-carewallet-manrope-bold text-lg text-carewallet-blue">
            Step 3 of 3
          </Text>
        </View>
        <ScrollView className="h-full">
          <Text className="mt-3 px-4 font-carewallet-manrope-bold text-[24px]">
            Task Details
          </Text>

          <TextInputLine
            title={'Title'}
            onChange={(value) => handleChange('Title', value)}
          />
          <TextInputParagraph
            title={'Description'}
            onChange={(value) => handleChange('Description', value)}
          />
          <RadioGroup
            title={'SCHEDULE TYPE'}
            options={['Quick Task', 'Scheduled']}
            onChange={(value) => handleChange('Schedule Type', value)}
          />
          <View className="m-4 mb-0">
            <Text className="mb-2 font-carewallet-montserrat-semibold">
              {'REPEAT'}
            </Text>
            <CWDropdown
              selected={repeat}
              items={Object.values(RepeatOptions)}
              setLabel={() => {
                setRepeat;
                values['Repeat'] = repeat;
              }}
            />
          </View>
          <View className="flex flex-row">
            <View className="mb-0 ml-4 mr-2 mt-1 w-[45%]">
              <Text className="mb-2 font-carewallet-montserrat-semibold">
                {'LABEL'}
              </Text>
              <CWDropdown
                selected={label}
                // TODO: Get labels for this group
                items={[]}
                setLabel={() => {
                  setLabel;
                  values['Label'] = label;
                }}
              />
            </View>
            <View className="mb-0 mr-4 mt-1 w-[45%]">
              <Text className="mb-2 font-carewallet-montserrat-semibold">
                {'ASSIGN'}
              </Text>
              <CWDropdown
                selected={assignedTo}
                // TODO: Get members for this group
                items={[]}
                setLabel={() => {
                  setAssignedTo;
                  values['Assigned To'] = assignedTo;
                }}
              />
            </View>
          </View>

          {/* If Quick Task is selected */}
          {values['Schedule Type'] === 'Quick Task' && (
            <Text>Quick task-specific inputs</Text>
          )}

          {/* If Scheduled is selected */}
          {values['Schedule Type'] === 'Scheduled' && (
            <Text>Scheduled task-specific inputs</Text>
          )}

          <View className="m-2 flex flex-row justify-end">
            <ForwardButton
              onPress={() => {
                // TODO: where to navigate to after task creation?
                navigation.navigate('TaskList');
                // TODO: create new task in database, assign to 'Assigned To'
                // task is added to calendar and task list by proxy?
                console.log(
                  'Task fields: ',
                  taskCreation,
                  JSON.stringify(values)
                );
              }}
            />
          </View>
        </ScrollView>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
}
