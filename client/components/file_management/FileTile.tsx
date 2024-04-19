import React from 'react';
import { Text, View } from 'react-native';

import { WebView } from 'react-native-webview';

interface FileTileProps {
  name: string;
  label: string;
  url: string;
}

export function FileTile({ name, label, url }: FileTileProps): JSX.Element {
  return (
    <View className="mx-5 my-3 bg-carewallet-white">
      <View className="flex-1 flex-row rounded-md border border-carewallet-gray p-4">
        <View className="mr-4 h-[7vh] w-[7vh]">
          <WebView
            source={{ uri: url }}
            className="h-full w-full flex-1 rounded-md border border-carewallet-gray"
          />
        </View>
        <View className="flex w-[60vw] flex-col justify-center">
          <View>
            <Text className="font-carewallet-manrope-semibold text-xs text-carewallet-black">
              {name}
            </Text>
          </View>
          {label && (
            <View className="mr-auto mt-1 w-fit rounded-lg border border-carewallet-gray px-2">
              <Text className="mt-auto font-carewallet-manrope-semibold text-xs text-carewallet-black">
                {label}
              </Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
}
