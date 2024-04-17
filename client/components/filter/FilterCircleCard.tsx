import React, { useState } from 'react';
import { Text, View } from 'react-native';

import { clsx } from 'clsx';

export function FilterCircleCard({
  selected,
  title
}: {
  selected: boolean;
  title: string;
}) {
  const [isSelected, setIsSelected] = useState(selected);

  const handleSelect = () => {
    setIsSelected(!isSelected);
  };

  const circleClasses = clsx(
    'h-34 ml-2 mb-2 mt-3 py-2 flex w-fit flex-row items-center rounded-full pr-3',
    {
      'border border-carewallet-blue': isSelected,
      'border border-carewallet-gray': !isSelected
    }
  );

  return (
    <View
      className={circleClasses}
      onTouchEnd={handleSelect} // Handle onPress event
    >
      <Text className="mr-auto pl-3 font-carewallet-manrope">{title}</Text>
    </View>
  );
}
