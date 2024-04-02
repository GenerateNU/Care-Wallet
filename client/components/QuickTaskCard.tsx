import React from 'react';
import { Text, View } from 'react-native';

import { clsx } from 'clsx';

import { CategoryIconsMap, TypeToCategoryMap } from '../types/type';
import { GetStatus } from '../utils/GetStatus';

interface QuickTaskCardProps {
  name: string;
  label: string;
  status: string;
}

export function QuickTaskCard({
  name,
  label,
  status
}: QuickTaskCardProps): JSX.Element {
  return (
    <View className="mx-auto h-[12vh] w-[90vw] rounded-xl border border-carewallet-gray">
      <View className="flex flex-row items-center">
        <View className="mr-auto">
          <Text className="ml-2 mt-2 font-carewallet-manrope-semibold text-base">
            {name}
          </Text>
        </View>
        <View className="mr-2 mt-2">
          {CategoryIconsMap[TypeToCategoryMap[label]]}
        </View>
      </View>
      <View className="mb-2 ml-2 mr-auto mt-auto">
        <View className="h-8 w-fit flex-row items-center justify-center space-x-2 rounded-3xl border border-carewallet-lightgray px-2">
          <View
            className={clsx(
              'h-5 w-5 rounded-full',
              GetStatus(status)?.color ?? 'border border-carewallet-lightgray'
            )}
          />
          <Text className="font-carewallet-manrope-semibold text-sm">
            {GetStatus(status)?.status}
          </Text>
        </View>
      </View>
    </View>
  );
}
