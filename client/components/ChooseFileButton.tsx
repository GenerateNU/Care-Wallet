import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { clsx } from 'clsx';
import { DocumentPickerAsset } from 'expo-document-picker';

import Upload from '../assets/profile/upload.svg';

export function ChooseFileButton({
  onPress,
  picked
}: {
  onPress: () => void;
  picked: DocumentPickerAsset | null;
}) {
  return (
    <View className="w-full flex-1">
      <TouchableOpacity
        onPress={onPress}
        className={clsx(
          'mt-2 flex h-[33vh] w-full items-center justify-center rounded-lg border-[3px] border-dashed border-carewallet-lightgray'
        )}
      >
        {picked ? (
          <Text className="my-20 ml-2">{picked.name}</Text>
        ) : (
          <>
            <Upload />
            <Text className="text-medium font-carewallet-manrope-bold text-carewallet-black">
              CHOOSE FILE
            </Text>
          </>
        )}
      </TouchableOpacity>
    </View>
  );
}
