import React from 'react';
import { Text, View } from 'react-native';

import Note from '../assets/task-creation/bed.svg';

export function NoteButton({ note }: { note: string }) {
  return (
    <View className="mt-2 h-8 w-fit flex-row items-center justify-center space-x-2 rounded-3xl border border-carewallet-lightgray px-2">
      <Note></Note>
      <Text className="font-carewallet-manrope text-sm text-carewallet-black">
        {note}
      </Text>
    </View>
  );
}
