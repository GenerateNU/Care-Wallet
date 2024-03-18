import React from 'react';
import { Text, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { IconButton } from 'react-native-paper';

import { AppStackNavigation } from '../../navigation/AppNavigation';
import { User } from '../../types/user';

interface ProfileTopHeaderProps {
  user: User;
  onTouchEndLeft?: AppStackNavigation;
  leftButtonText?: JSX.Element | string;
  onTouchEndRight?: () => void;
  rightButtonText?: JSX.Element | string;
}

export function ProfileTopHeader({
  user,
  leftButtonText,
  rightButtonText
}: ProfileTopHeaderProps) {
  const navigation = useNavigation<AppStackNavigation>();
  return (
    <View className="flex flex-row">
      {leftButtonText && (
        <IconButton
          className="absolute mt-14 flex h-[40px] self-start rounded-xl bg-carewallet-gray"
          mode="contained"
          icon={() => leftButtonText}
          onPress={() => navigation.goBack()}
        />
      )}
      <Text className="mx-auto mt-14 flex-wrap self-center text-center text-3xl font-semibold text-carewallet-white">
        {user.first_name} {user.last_name}
      </Text>
      {rightButtonText && (
        <IconButton
          className="absolute right-0 mr-2 mt-14 flex h-[40px] self-start rounded-xl bg-carewallet-gray"
          mode="contained"
          icon={() => rightButtonText}
        />
      )}
    </View>
  );
}
