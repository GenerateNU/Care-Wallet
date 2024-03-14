import React from 'react';
import { Text, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { styled } from 'nativewind';

import ArrowLeft from '../../assets/arrow-left.svg';
import Edit from '../../assets/profile/edit.svg';
import Ellipse from '../../assets/profile/ellipse.svg';
import { useCareWalletContext } from '../../contexts/CareWalletContext';
import { AppStackNavigation } from '../../navigation/AppNavigation';
import { GroupRole, Role } from '../../types/group';
import { User } from '../../types/user';
import { ProfileTopHeader } from './ProfileTopHeader';

const StyledEllipse = styled(Ellipse);

interface HeaderProps {
  user: User | undefined;
  role: GroupRole | undefined;
}

export function Header({ user, role }: HeaderProps) {
  const { user: signedInUser } = useCareWalletContext();
  const navigate = useNavigation<AppStackNavigation>();

  if (!user) return null;

  return (
    <>
      <View className="z-10 h-fit max-h-fit min-h-fit flex-grow-0 items-center bg-carewallet-black">
        <View className="w-full justify-center align-middle">
          {role?.role === Role.PATIENT ||
          signedInUser.userID !== user.user_id ? (
            <ProfileTopHeader
              user={user}
              onTouchEndLeft={navigate.goBack}
              leftButtonText={<ArrowLeft />}
            />
          ) : (
            <ProfileTopHeader
              user={user}
              onTouchEndLeft={navigate.goBack}
              leftButtonText={<ArrowLeft />}
              rightButtonText={<Edit />}
            />
          )}
          <Text className="items-center justify-center text-center text-xl  text-carewallet-white">
            {`${role?.role.charAt(0)}${role?.role.slice(1).toLowerCase()} ${role?.role !== Role.PATIENT ? 'Caretaker' : ''}`}
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
