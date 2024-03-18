import React from 'react';
import { Text, View } from 'react-native';

import { RouteProp, useRoute } from '@react-navigation/native';

import { BackButton } from '../components/TaskType/BackButton';
import styleJsonData from '../types/task-creation.json';

type ParamList = {
  mt: {
    type: string;
  };
};

type StyleJsonType = {
  [key: string]: {
    Header: string;
    Body: {
      [key: string]:
        | string
        | {
            [key: string]: string;
          };
    };
  };
};

export function TaskCreation() {
  const route = useRoute<RouteProp<ParamList, 'mt'>>();
  const { type } = route.params;

  const styleJson: StyleJsonType = styleJsonData;
  console.log(styleJson);
  console.log(type);
  console.log(styleJson[type]);

  return (
    <View className="mt-10">
      <View>
        <BackButton />
      </View>
      <Text>{type}</Text>
    </View>
  );
}
