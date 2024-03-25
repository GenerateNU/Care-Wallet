import React from 'react';

import { useNavigation } from '@react-navigation/native';
import { IconButton } from 'react-native-paper';

import ArrowLeft from '../../assets/arrow-left.svg';
import { AppStackNavigation } from '../../navigation/types';

export function BackButton() {
  const navigation = useNavigation<AppStackNavigation>();

  return (
    <IconButton
      className="align-center m-2 flex h-[50px] w-[52px] justify-center rounded-xl bg-carewallet-gray"
      mode="contained"
      icon={({ color }) => <ArrowLeft fill={color} />}
      onPress={() => navigation.goBack()}
    />
  );
}
