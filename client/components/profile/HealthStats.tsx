import React, { useState } from 'react';
import { FlatList, Pressable, Text, View } from 'react-native';

export function HealthStats() {
  const [, setCanPress] = useState(true);
  const HealthStats: string[] = [];

  return HealthStats.length > 0 ? (
    <FlatList
      className="mt-10 h-fit max-h-fit flex-grow-0"
      onScrollBeginDrag={() => setCanPress(false)}
      onScrollEndDrag={() => setCanPress(true)}
      horizontal
      showsHorizontalScrollIndicator={false}
      data={HealthStats}
      renderItem={({ index }) => (
        <Pressable key={index} onTouchEnd={() => {}}>
          <View className="items-center px-2">
            <View className="z-10 h-[35vh] w-[40vw] rounded-3xl border border-carewallet-lightgray bg-carewallet-white" />
          </View>
        </Pressable>
      )}
    />
  ) : (
    <Text className="my-auto text-center font-carewallet-manrope">
      There are no health stats to view.
    </Text>
  );
}
