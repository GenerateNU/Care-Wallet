import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

import Upload from '../assets/profile/upload.svg';

export function ChooseFileButton({ onPress }: { onPress: () => void }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="mt-2 flex h-5/6 w-full items-center justify-center rounded-lg border-[3px] border-dashed border-carewallet-lightgray"
    >
      <Upload />
      <Text className="text-medium font-carewallet-manrope-bold text-carewallet-black">
        CHOOSE FILE
      </Text>
    </TouchableOpacity>
  );
}
