import React from 'react';
import { Dimensions, Image, Text, TouchableOpacity, View } from 'react-native';

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
    <TouchableOpacity
      onPress={onPress}
      className={clsx(
        'mt-2 flex h-[30vh] w-full items-center justify-center rounded-lg border-[3px] border-dashed border-carewallet-lightgray',
        picked && 'h-[50vh]'
      )}
    >
      {picked ? (
        <View className="w-full items-center justify-center">
          <Image
            source={{
              uri: picked.uri,
              width: Dimensions.get('window').width / 2,
              height: Dimensions.get('window').height / 3
            }}
          />
        </View>
      ) : (
        <>
          <Upload />
          <Text className="text-medium font-carewallet-manrope-bold text-carewallet-black">
            CHOOSE FILE
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
}
