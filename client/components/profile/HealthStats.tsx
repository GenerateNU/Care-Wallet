import React, { useState } from 'react';
import { FlatList, Pressable, Text, View } from 'react-native';

export function HealthStats() {
  const [, setCanPress] = useState(true);
  const HealthStats: string[] = [];

  return HealthStats.length > 0 ? (
    <FlatList
      className="mt-2 h-fit max-h-fit"
      onScrollBeginDrag={() => setCanPress(false)}
      onScrollEndDrag={() => setCanPress(true)}
      horizontal
      showsHorizontalScrollIndicator={false}
      data={HealthStats}
      renderItem={({ index }) => (
        <Pressable key={index} onTouchEnd={() => {}}>
          <View className="mx-2 h-[80vh] w-[40vw] items-center"></View>
        </Pressable>
      )}
    />
  ) : (
    <View className="mt-2 h-[45vh] items-center justify-center rounded-xl border border-carewallet-lightgray">
      <Text className="font-carewallet-manrope">
        There are no health stats to view.
      </Text>
    </View>
  );
}
