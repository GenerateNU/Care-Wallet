import React from 'react';
import { Text, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { styled } from 'nativewind';

import Ellipse from '../../assets/profile/ellipse.svg';
import { useCareWalletContext } from '../../contexts/CareWalletContext';
import { AppStackNavigation } from '../../navigation/AppNavigation';
import { User } from '../../types/user';
import { ProfileTopHeader } from './ProfileTopHeader';

const StyledEllipse = styled(Ellipse);

export function Header({ user }: { user: User }) {
  const { group } = useCareWalletContext();
  const navigate = useNavigation<AppStackNavigation>();

  if (!user || !group) return null;

  return (
    <>
      <View className="z-10 h-fit max-h-fit min-h-fit flex-grow-0 items-center bg-carewallet-black">
        <View className="w-full justify-center align-middle">
          <ProfileTopHeader
            user={user}
            onTouchEndLeft={navigate.goBack}
            leftButtonText="Back"
            rightButtonText="Edit"
          />
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
