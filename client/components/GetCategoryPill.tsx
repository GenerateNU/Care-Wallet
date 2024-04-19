import React from 'react';
import { Text, View } from 'react-native';

import { clsx } from 'clsx';

import {
  CategoryIconsMap,
  TaskTypeDescriptions,
  TypeToCategoryMap
} from '../types/type';

export function GetCategoryPill({ category }: { category: string }) {
  console.log('category', TypeToCategoryMap[category]);
  switch (TypeToCategoryMap[category]) {
    case 'Health & Medical':
      return (
        <View
          className={clsx(
            'mr-auto flex flex-row items-center space-x-2 rounded-full border border-carewallet-lightgray px-2 py-1',
            'bg-carewallet-pink/20'
          )}
        >
          <View>{CategoryIconsMap[TypeToCategoryMap[category]]}</View>
          <Text
            className={clsx('font-carewallet-manrope', 'text-carewallet-pink')}
          >
            {TaskTypeDescriptions[category]}
          </Text>
        </View>
      );
    case 'Home & Lifestyle':
      return (
        <View
          className={clsx(
            'mr-auto flex flex-row items-center space-x-2 rounded-full border border-carewallet-lightgray px-2 py-1',
            'bg-carewallet-yellow/20'
          )}
        >
          <View>{CategoryIconsMap[TypeToCategoryMap[category]]}</View>
          <Text
            className={clsx(
              'font-carewallet-manrope',
              'text-carewallet-yellow'
            )}
          >
            {TaskTypeDescriptions[category]}
          </Text>
        </View>
      );
    case 'Personal':
      return (
        <View
          className={clsx(
            'mr-auto flex flex-row items-center space-x-2 rounded-full border border-carewallet-lightgray px-2 py-1',
            'bg-carewallet-purple/20'
          )}
        >
          <View>{CategoryIconsMap[TypeToCategoryMap[category]]}</View>
          <Text
            className={clsx(
              'font-carewallet-manrope',
              'text-carewallet-purple'
            )}
          >
            {TaskTypeDescriptions[category]}
          </Text>
        </View>
      );
    case 'Financial & Legal':
      return (
        <View
          className={clsx(
            'mr-auto flex flex-row items-center space-x-2 rounded-full border border-carewallet-lightgray px-2 py-1',
            'bg-carewallet-green/20'
          )}
        >
          <View>{CategoryIconsMap[TypeToCategoryMap[category]]}</View>
          <Text
            className={clsx('font-carewallet-manrope', 'text-carewallet-green')}
          >
            {TaskTypeDescriptions[category]}
          </Text>
        </View>
      );
    default:
      return (
        <View
          className={clsx(
            'mr-auto flex flex-row items-center space-x-2 rounded-full border border-carewallet-lightgray px-2 py-1',
            'bg-carewallet-coral/20'
          )}
        >
          <View>{CategoryIconsMap[TypeToCategoryMap[category]]}</View>
          <Text
            className={clsx('font-carewallet-manrope', 'text-carewallet-coral')}
          >
            {TaskTypeDescriptions[category]}
          </Text>
        </View>
      );
  }
}
