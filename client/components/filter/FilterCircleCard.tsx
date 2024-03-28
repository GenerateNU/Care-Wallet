import React from 'react';
import { Text, View } from 'react-native';

import clsx from 'clsx';

export function FilterCircleCard({
  selected,
  title
}: {
  selected: boolean;
  title: string;
}) {
  return (
    <View className="h-34 ml-2 mt-3 flex w-fit flex-row items-center rounded-full border pr-3">
      <View
        className={clsx(
          'ml-2 h-5 w-5 rounded-full',
          selected ? 'bg-carewallet-blue/30' : 'border'
        )}
      />
      <Text className="mr-auto pl-3 text-lg font-normal">{title}</Text>
    </View>
  );
}
