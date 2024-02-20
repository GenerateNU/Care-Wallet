import React from 'react';
import { Text, View } from 'react-native';

import { styled } from 'nativewind';

import Ellipse from '../../assets/profile/ellipse.svg';
import { User } from '../../types/user';

const StyledEllipse = styled(Ellipse);

export function Header({ user }: { user: User }) {
  return (
    <>
      <View className="z-10 h-fit max-h-fit min-h-fit items-center bg-carewallet-black">
        <View className="justify-center align-middle">
          <Text className="items-center justify-center pt-14 text-center text-3xl text-carewallet-white">
            {user.first_name} {user.last_name}
          </Text>
          <Text className="items-center justify-center text-center text-xl  text-carewallet-white">
            TODO
          </Text>
          <Text className="items-center justify-center text-center text-lg  text-carewallet-white">
            000-000-0000
          </Text>
        </View>
      </View>
      <View className="items-center justify-center align-middle">
        <StyledEllipse className="-top-16 ml-0.5" />
        <View className=" -top-28 z-10 h-20 w-20 rounded-full border border-carewallet-black bg-carewallet-white" />
      </View>
    </>
  );
}
