import React from 'react';

import { IconButton } from 'react-native-paper';

import ArrowLeft from '../../assets/arrow-left.svg';

export function NavigationLeftArrow({ onPress }: { onPress: () => void }) {
  return (
    <IconButton
      className="align-center m-2 flex h-[50px] w-[52px] justify-center rounded-xl border border-carewallet-lightgray bg-carewallet-white"
      mode="contained"
      icon={() => <ArrowLeft fill="blue" />}
      onPress={onPress}
    />
  );
}
