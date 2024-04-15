import React from 'react';
import { Text, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { WebView } from 'react-native-webview';

import { AppStackNavigation } from '../../navigation/types';

interface FileTileProps {
  name: string;
  label: string;
  url: string;
}

export function FileTile({ name, label, url }: FileTileProps): JSX.Element {
  const navigation = useNavigation<AppStackNavigation>();
  return (
    <View className="px-5 py-3">
      <View
        className="flex-1 flex-row rounded-md border border-carewallet-gray p-4"
        onTouchEnd={() =>
          navigation.navigate('SingleFile', { url, name, label })
        }
      >
        <View className="mr-4 h-[7vh] w-[7vh]">
          <WebView
            source={{ uri: url }}
            className="h-full w-full flex-1 rounded-md border border-carewallet-gray"
          />
        </View>
        <View className="flex-grow">
          <Text className="text-lg text-carewallet-black">{name}</Text>
          <Text className="text-carewallet-black">{label}</Text>
        </View>
      </View>
    </View>
  );
}
