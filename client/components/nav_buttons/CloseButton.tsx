import React from 'react';

import { IconButton } from 'react-native-paper';

import Close from '../../assets/close.svg';

export function CloseButton({ onPress }: { onPress: () => void }) {
  return (
    <IconButton
      className="align-center m-2 flex h-[50px] w-[52px] justify-center rounded-xl bg-carewallet-blue"
      mode="contained"
      icon={Close}
      onPress={onPress}
    />
  );
}
