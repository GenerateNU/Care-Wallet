import React from 'react';
import { Text, View } from 'react-native';

import moment from 'moment';

import { User } from '../../types/user';

export function Header({ user }: { user: User | undefined }) {
  const currentTime = moment();
  return (
    <View>
      <Text className="font-carewallet-manrope-semibold text-2xl text-carewallet-black">
        {currentTime.format('A') === 'AM'
          ? `Good Morning ${user?.first_name ?? ''}!`
          : currentTime.hour() >= 12 && currentTime.hour() < 15
            ? `Good Afternoon ${user?.first_name ?? ''}!`
            : `Good Evening ${user?.first_name ?? ''}!`}
      </Text>
    </View>
  );
}
