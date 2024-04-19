import React from 'react';
import { View } from 'react-native';

import BackgroundPattern from '../assets/background.svg';

export function Background() {
  return (
    <View className="absolute -z-50 h-[100vh] w-[100vw]">
      <BackgroundPattern />
    </View>
  );
}
