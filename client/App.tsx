import React from 'react';
import { SafeAreaView, Text, View } from 'react-native';

import {
  Manrope_400Regular,
  Manrope_600SemiBold,
  Manrope_700Bold
} from '@expo-google-fonts/manrope';
import {
  Montserrat_400Regular,
  Montserrat_600SemiBold,
  Montserrat_700Bold
} from '@expo-google-fonts/montserrat';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useFonts } from 'expo-font';
import { ActivityIndicator, PaperProvider } from 'react-native-paper';

import { CareWalletProvider } from './contexts/CareWalletContext';
import { Router } from './navigation/Router';

export default function App() {
  const queryClient = new QueryClient();
  const [fontsLoaded] = useFonts({
    Manrope_400Regular,
    Manrope_600SemiBold,
    Manrope_700Bold,
    Montserrat_400Regular,
    Montserrat_600SemiBold,
    Montserrat_700Bold
  });

  if (!fontsLoaded)
    return (
      <View className="w-full flex-1 items-center justify-center bg-carewallet-white text-3xl">
        <ActivityIndicator size="large" />
        <Text>Loading...</Text>
      </View>
    );

  return (
    <QueryClientProvider client={queryClient}>
      <CareWalletProvider>
        <View className="absolute -z-10 h-20 w-[100vw] bg-carewallet-white" />
        <SafeAreaView className="h-[100vh] flex-1">
          <PaperProvider>
            <Router />
          </PaperProvider>
        </SafeAreaView>
        <View className="absolute -z-20 h-full w-[100vw] bg-carewallet-blue" />
      </CareWalletProvider>
    </QueryClientProvider>
  );
}
