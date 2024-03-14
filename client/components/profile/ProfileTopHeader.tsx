import React from 'react';
import { Pressable, Text, View } from 'react-native';

import { User } from '../../types/user';

interface ProfileTopHeaderProps {
  user: User;
  onTouchEndLeft?: () => void;
  leftButtonText?: JSX.Element | string;
  onTouchEndRight?: () => void;
  rightButtonText?: JSX.Element | string;
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
      <Pressable className="ml-5 mr-auto" onTouchEnd={() => onTouchEndLeft}>
        <View className="my-auto mt-14 h-10 w-10 items-center justify-center self-start rounded-lg bg-carewallet-white">
          {leftButtonText}
        </View>
      </Pressable>
      <Text className="mt-14 w-full flex-wrap text-center text-3xl font-semibold text-carewallet-white">
        {user.first_name} {user.last_name}
      </Text>
      {rightButtonText && (
        <Pressable className="ml-auto mr-5" onTouchEnd={onTouchEndRight}>
          <View className="mt-14 h-10 w-10 items-center justify-center self-start rounded-lg bg-carewallet-white">
            {rightButtonText}
          </View>
        </Pressable>
      )}
    </View>
  );
}
