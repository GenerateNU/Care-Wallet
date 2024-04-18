import React from 'react';

import { IconButton } from 'react-native-paper';

import ArrowRightIcon from '../../assets/arrow-right.svg';

interface ForwardButtonProps {
  onPress: () => void;
}

export function ForwardButton({ onPress }: ForwardButtonProps) {
  return (
    <IconButton
      className="align-center m-2 flex h-[50px] w-[52px] justify-center rounded-xl bg-carewallet-blue"
      mode="contained"
      icon={({ color }) => <ArrowRightIcon fill={color} />}
      onPress={onPress}
    />
  );
}
