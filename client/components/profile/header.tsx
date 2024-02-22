import React from 'react';
import { Text, View } from 'react-native';

import { styled } from 'nativewind';

import Ellipse from '../../assets/profile/ellipse.svg';
import { useCareWalletContext } from '../../contexts/CareWalletContext';
import { User } from '../../types/user';

const StyledEllipse = styled(Ellipse);

// TODO: Separate the header into a separate component used across the profile screens
export function Header({ user }: { user: User }) {
  const { group } = useCareWalletContext();
  return (
    <>
      <View className="z-10 h-fit max-h-fit min-h-fit flex-grow-0 items-center bg-carewallet-black">
        <View className="justify-center align-middle">
          <Text className="items-center justify-center pt-14 text-center text-3xl font-extrabold text-carewallet-white">
            {user.first_name} {user.last_name}
          </Text>
          <Text className="items-center justify-center text-center text-xl  text-carewallet-white">
            {`${group.role.charAt(0)}${group.role.slice(1).toLowerCase()} Caregiver`}
          </Text>
          <Text className="items-center justify-center text-center text-lg  text-carewallet-white">
            {user.phone ? user.phone : user.email}
          </Text>
        </View>
      </View>
      <View className="items-center justify-center align-middle">
        <StyledEllipse className="-top-16 ml-0.5" />
        <View className="absolute z-10 h-20 w-20 rounded-full border border-carewallet-black bg-carewallet-white" />
      </View>
    </>
  );
}
