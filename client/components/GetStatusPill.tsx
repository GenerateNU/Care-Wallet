import React from 'react';
import { Text, View } from 'react-native';

export function GetStatusPill({ status }: { status: string }) {
  switch (status) {
    case 'INCOMPLETE': {
      return (
        <View className="h-8 w-fit flex-row items-center justify-center space-x-2 rounded-3xl border border-carewallet-lightgray px-2">
          <View className="h-5 w-5 rounded-full bg-carewallet-coral" />
          <Text className="font-carewallet-manrope text-sm">Incomplete</Text>
        </View>
      );
    }
    case 'INPROGRESS': {
      return (
        <View className="h-8 w-fit flex-row items-center justify-center space-x-2 rounded-3xl border border-carewallet-lightgray px-2">
          <View className="h-5 w-5 rounded-full bg-carewallet-yellow" />
          <Text className="font-carewallet-manrope text-sm">In Progress</Text>
        </View>
      );
    }
    case 'COMPLETE': {
      return (
        <View className="h-8 w-fit flex-row items-center justify-center space-x-2 rounded-3xl border border-carewallet-lightgray px-2">
          <View className="h-5 w-5 rounded-full bg-carewallet-green" />
          <Text className="font-carewallet-manrope text-sm">Done</Text>
        </View>
      );
    }
    case 'OVERDUE': {
      return (
        <View className="h-8 w-fit flex-row items-center justify-center space-x-2 rounded-3xl border border-carewallet-lightgray px-2">
          <View className="h-5 w-5 rounded-full bg-carewallet-orange" />
          <Text className="font-carewallet-manrope text-sm">Past Due</Text>
        </View>
      );
    }
    case 'TODO': {
      return (
        <View className="h-8 w-fit flex-row items-center justify-center space-x-2 rounded-3xl border border-carewallet-lightgray px-2">
          <View className="h-5 w-5 rounded-full border border-carewallet-lightgray" />
          <Text className="font-carewallet-manrope-semibold text-sm">
            To Do
          </Text>
        </View>
      );
    }
  }
}
