import React from 'react';
import { Text, View } from 'react-native';

import { RouteProp, useRoute } from '@react-navigation/native';

import { BackButton } from '../components/TaskType/BackButton';

type ParamList = {
  mt: {
    type: string;
  };
};

export function TaskCreation() {
  const route = useRoute<RouteProp<ParamList, 'mt'>>();
  const { type } = route.params;

  return (
    <View className="mt-10">
      <View>
        <BackButton />
      </View>
      <Text>{type}</Text>
    </View>
  );
}
