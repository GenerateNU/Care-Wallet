import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

export function ChooseFileButton({ onPress }: { onPress: () => void }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="mt-2 flex h-2/4 w-full items-center justify-center rounded-lg border-[3px] border-dashed border-carewallet-lightgray"
    >
      <Text className="text-lg text-carewallet-black">Choose File</Text>
    </TouchableOpacity>
  );
}
