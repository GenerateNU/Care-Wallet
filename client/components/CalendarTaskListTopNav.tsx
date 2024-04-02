import React from 'react';
import { Text, View } from 'react-native';

import { clsx } from 'clsx';

import { AppStackNavigation } from '../navigation/types';

export function CalendarTaskListTopNav({
  navigator,
  current
}: {
  navigator: AppStackNavigation;
  current: string;
}): JSX.Element {
  return (
    <View className="flex flex-row items-center justify-between bg-carewallet-white px-[20vw] py-5">
      <View
        onTouchEnd={() => {
          navigator.navigate('Calendar');
        }}
      >
        <Text
          className={clsx(
            'font-carewallet-montserrat-semibold text-xs text-carewallet-gray',
            current === 'Calendar' && 'text-carewallet-blue underline'
          )}
        >
          CALENDAR
        </Text>
      </View>
      <View
        onTouchEnd={() => {
          navigator.navigate('TaskList');
        }}
      >
        <Text
          className={clsx(
            'font-carewallet-montserrat-semibold text-xs text-carewallet-gray',
            current === 'TaskList' && 'text-carewallet-blue underline'
          )}
        >
          TASK LIST
        </Text>
      </View>
    </View>
  );
}
