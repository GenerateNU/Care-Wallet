import React from 'react';

import { useNavigation } from '@react-navigation/native';
import { IconButton } from 'react-native-paper';

import Plus from '../../assets/profile/plus.svg';
import { AppStackNavigation } from '../../navigation/types';

export function AddButtom() {
  const navigation = useNavigation<AppStackNavigation>();

  return (
    <IconButton
      className="align-center m-2 flex h-[50px] w-[52px] justify-center rounded-xl bg-carewallet-blue"
      mode="contained"
      icon={({ color }) => <Plus fill={color} />}
      onPress={() => navigation.goBack()}
    />
  );
}
