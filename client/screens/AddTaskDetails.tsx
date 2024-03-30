import React, { useState } from 'react';
import {
  //   ActivityIndicator,
  //   Pressable,
  Text, //   TextInput,
  View
} from 'react-native';

// import { useNavigation } from '@react-navigation/native';
import {
  GestureHandlerRootView,
  ScrollView
} from 'react-native-gesture-handler';

import { BackButton } from '../components/nav_buttons/BackButton';
import { AddressComponent } from '../components/task_creation/AddressComponent.tsx';
import { RadioGroup } from '../components/task_creation/RadioGroup.tsx';
import { TextInputLine } from '../components/task_creation/TextInputLine.tsx';
import { TextInputParagraph } from '../components/task_creation/TextInputParagraph.tsx';

// import { AppStackNavigation } from '../navigation/types';
// import { addNewTaskMutation } from '../services/task';
// import { Task } from '../types/task';

// type ParamList = {
//   mt: {
//     taskType: string;
//   };
// };

export default function AddTaskDetails() {
  //   const navigation = useNavigation<AppStackNavigation>();

  const compList: { key: string; value: string }[] = [];

  const [values, setValues] = useState<{ [key: string]: string }>({});

  values;

  const handleChange = (key: string, value: string) => {
    setValues((prevValues) => ({
      ...prevValues,
      [key]: value
    }));
  };

  //   const [modalVisible, setModalVisible] = useState(false);

  return (
    <GestureHandlerRootView>
      <ScrollView className="mt-10">
        <View className="flex w-full flex-row items-center justify-center">
          <View className="mr-[95px]">
            <BackButton />
          </View>
          <Text className="mr-auto self-center text-center text-carewallet-gray">
            Step 1 of 2
          </Text>
        </View>
        <Text className="text-center text-2xl font-bold">Task Details</Text>
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
