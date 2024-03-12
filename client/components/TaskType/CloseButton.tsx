import React from 'react';

import { useNavigation } from '@react-navigation/native';
import { IconButton } from 'react-native-paper';

import Close1 from '../../assets/close/close1.svg';
import Close2 from '../../assets/close/close2.svg';
import { AppStackNavigation } from '../../navigation/AppNavigation';

export function CloseButton({ onPress }: { onPress: () => void }) {
  const navigation = useNavigation<AppStackNavigation>();

  return (
    <IconButton
      className="align-center m-2 flex h-[50px] w-[52px] justify-center rounded-xl bg-carewallet-gray"
      mode="contained"
      icon={() => (
        <>
          <Close1 style={{ position: 'absolute', top: 20, left: 20 }} />
          <Close2 style={{ position: 'absolute', top: 20, left: 20 }} />
        </>
      )}
      onPress={onPress}
    />
  );
}
