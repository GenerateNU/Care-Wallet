import React from 'react';

import { useNavigation } from '@react-navigation/native';
import { IconButton } from 'react-native-paper';

import ArrowLeft from '../../assets/arrow-left.svg';
import { AppStackNavigation } from '../../navigation/types';

export function BackButton() {
  const navigation = useNavigation<AppStackNavigation>();

  return (
    <IconButton
      className="align-center m-2 flex h-[50px] w-[52px] justify-center rounded-xl border border-carewallet-lightgray bg-carewallet-white"
      mode="contained"
      icon={() => <ArrowLeft fill="blue" />}
      onPress={() => navigation.goBack()}
    />
  );
}
