import React from 'react';
import { SafeAreaView, Text, View } from 'react-native';

import { BackButton } from '../nav_buttons/BackButton';

export function Header() {
  return (
    <SafeAreaView className="bg-carewallet-white/80">
      <View className="flex flex-row items-center justify-between border-b border-carewallet-lightgray bg-carewallet-white">
        <View className="pl-1">
          <BackButton />
        </View>
        <Text className="mx-auto font-carewallet-montserrat-semibold text-xl text-carewallet-blue">
          View Files
        </Text>
        <View className="">
          <View className="right-3 h-12 w-12 items-center justify-center rounded-xl bg-carewallet-blue">
            <Text className="text-4xl text-carewallet-white">+</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
