import React, { useState } from 'react';
import { FlatList, Pressable, View } from 'react-native';

export function HealthStats() {
  const [canPress, setCanPress] = useState(true);

  return (
    <FlatList
      keyboardShouldPersistTaps="always"
      className="mt-10 h-fit max-h-fit flex-grow-0"
      onScrollBeginDrag={() => setCanPress(false)}
      onScrollEndDrag={() => setCanPress(true)}
      horizontal
      showsHorizontalScrollIndicator={false}
      data={Array.from({ length: 10 }, (_, i) => i)}
      renderItem={({ index }) => (
        <Pressable
          key={index}
          onTouchEnd={() => {
            if (canPress) console.log('Pressed');
          }}
        >
          <View className="items-center px-2">
            <View className="z-10 h-[30vh] w-32 rounded-3xl border border-carewallet-lightgray bg-carewallet-white" />
          </View>
        </Pressable>
      )}
    />
  );
}
