import React from 'react';
import { Text, View } from 'react-native';

import clsx from 'clsx';

export function SettingsButtonGroup({
  title,
  buttons
}: {
  title: string;
  buttons: { text: string; onPress: () => void; icon: JSX.Element }[];
}) {
  return (
    <View className="mx-auto mt-2 w-[80vw]">
      <Text className="text-base">{title}</Text>
      <View className="mt-3 rounded-lg border border-carewallet-black">
        {buttons.map((button, index) => (
          <View
            key={index + title}
            className={clsx(
              'h-10 w-full justify-center border-carewallet-black',
              index !== 0 && 'border-t'
            )}
            onTouchEnd={button.onPress}
          >
            <View className="ml-4 flex flex-row items-center">
              {button.icon}
              <Text className="ml-2">{button.text}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}
