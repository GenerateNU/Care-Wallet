import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import Plus from '../../assets/plus.svg';
import { BackButton } from '../nav_buttons/BackButton';

const Header = () => {
  return (
    <View className="flex flex-row items-center justify-between border-carewallet-lightgray bg-carewallet-white pb-3 pt-3">
      <View className="pl-4">
        <BackButton />
      </View>
      <Text className="carewallet-manrope-bold justify-self-center text-xl text-carewallet-blue">
        View Files
      </Text>
      <View className="pr-4">
        <Plus />
      </View>
    </View>
  );
};

export default Header;
