import React from 'react';
import { Text, View } from 'react-native';

import WebView from 'react-native-webview';

interface FileTileProps {
  name: String;
  label: String;
  url: String;
}

export function FileTile({ name, label, url }: FileTileProps): JSX.Element {
  return (
    <View className="px-[20px] pt-[20px]">
      <View className="flex-shrink flex-row rounded-[10px] border border-opacity-20 p-[15px]">
        <WebView
          source={{ uri: url }}
          className="block justify-self-start rounded-md border"
        />
        <View className="ml-[10px] flex-grow">
          <Text className="text-black text-lg">{name}</Text>
          <Text className="text-black">{label}</Text>
        </View>
      </View>
    </View>
  );
}

export default FileTile;
