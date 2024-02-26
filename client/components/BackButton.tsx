import React from 'react';

import { useNavigation } from '@react-navigation/native';
import { Button } from 'react-native-paper';

import { AppStackNavigation } from '../navigation/AppNavigation';

// TODO style
export function BackButton() {
  const navigation = useNavigation<AppStackNavigation>();

  return (
    <Button
      className="m-2 rounded-xl bg-carewallet-gray"
      textColor="black"
      onPress={() => navigation.goBack()}
      mode="contained"
    >
      Back
    </Button>
  );
}
