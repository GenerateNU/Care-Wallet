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
      <View className="flex-1 flex-row rounded-md border p-[15px]">
        <View className="mr mr-4 h-[7vh] w-[7vh]">
          <WebView
            source={{ uri: url }}
            className="h-full w-full flex-1 rounded-md border"
          />
        </View>
        <View className="flex-grow">
          <Text className="text-black text-lg">{name}</Text>
          <Text className="text-black">{label}</Text>
        </View>
      </View>
    </View>
  );
}

export default FileTile;
