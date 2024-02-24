import React from 'react';
import { Pressable, Text, View } from 'react-native';

import { User } from '../../types/user';

interface ProfileTopHeaderProps {
  user: User;
  onTouchEndLeft?: () => void;
  leftButtonText?: JSX.Element | string;
  onTouchEndRight?: () => void;
  rightButtonText?: string;
}

export function ProfileTopHeader({
  user,
  onTouchEndLeft,
  leftButtonText,
  onTouchEndRight,
  rightButtonText
}: ProfileTopHeaderProps) {
  return (
    <View className="flex w-full flex-row items-center justify-center">
      <Pressable className="ml-5 mr-auto" onTouchEnd={onTouchEndLeft}>
        <View className="mt-14 h-7 w-14 items-center justify-center self-start rounded-lg bg-carewallet-white">
          {leftButtonText}
        </View>
      </Pressable>
      <Text className="mt-14 self-center text-center text-3xl font-extrabold text-carewallet-white">
        {user.first_name} {user.last_name}
      </Text>
      <Pressable className="ml-auto mr-5" onTouchEnd={onTouchEndRight}>
        <View className="text mt-14 h-7 w-14 items-center justify-center self-start rounded-lg bg-carewallet-white">
          <Text className="text-md">{rightButtonText}</Text>
        </View>
      </Pressable>
    </View>
  );
}
