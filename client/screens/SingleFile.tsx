import React from 'react';
import { SafeAreaView, Text, View } from 'react-native';

import { RouteProp } from '@react-navigation/native';
import WebView from 'react-native-webview';

import { BackButton } from '../components/nav_buttons/BackButton';
import { AppStackParamList } from '../navigation/types';

type SingleFileProps = RouteProp<AppStackParamList, 'SingleFile'>;

export default function SingleFile({ route }: { route: SingleFileProps }) {
  const { url } = route.params;

  return (
    <SafeAreaView className="flex-1 bg-carewallet-white">
      <View className="flex-row items-center justify-between border-b border-carewallet-lightgray bg-carewallet-white px-3 pb-4">
        <BackButton />
        <Text className="flex-1 pr-20 text-center text-xl font-bold text-carewallet-blue">
          View Files
        </Text>
      </View>
      <View className="flex-1">
        <WebView
          source={{ uri: url }}
          className="flex-1 rounded-md border border-carewallet-gray"
        />
      </View>
    </SafeAreaView>
  );
}
