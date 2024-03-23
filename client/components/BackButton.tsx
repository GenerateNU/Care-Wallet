import React from 'react';

import { useNavigation } from '@react-navigation/native';
import { Button } from 'react-native-paper';

import { AppStackNavigation } from '../navigation/types';

export function BackButton() {
  const navigation = useNavigation<AppStackNavigation>();

  return (
    <Button
      className="bg-carewallet-gray"
      onPress={() => navigation.goBack()}
      mode="contained"
      style={{ borderRadius: 8, marginTop: 16 }}
      contentStyle={{ height: 48 }}
    >
      Back
    </Button>
  );
}
