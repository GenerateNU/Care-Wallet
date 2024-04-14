import React from 'react';
import { Text, View } from 'react-native';

import _ from 'lodash';
import { WebView } from 'react-native-webview';

import { useCareWalletContext } from '../../contexts/CareWalletContext';
import { useProfileFile } from '../../services/file';
import { GroupRole, Role } from '../../types/group';
import { User } from '../../types/user';
import { BackButton } from '../nav_buttons/BackButton';
import { NavigationLeftArrow } from '../nav_buttons/NavigateLeftArrow';

interface HeaderProps {
  user: User | undefined;
  role: GroupRole | undefined;
  onPress?: () => void;
}

export function Header({ user, role, onPress }: HeaderProps) {
  const { user: signedInUser } = useCareWalletContext();
  const { file } = useProfileFile(user?.profile_picture ?? '');
  return (
    <View>
      <View className="flex h-[10vh] flex-row items-center border-b border-carewallet-lightgray">
        <View className="absolute">
          {role?.role === Role.PATIENT ? (
            <BackButton />
          ) : (
            signedInUser.userID !== user?.user_id &&
            onPress && <NavigationLeftArrow onPress={onPress} />
          )}
        </View>
        <Text
          className={
            'mx-auto my-auto font-carewallet-montserrat-bold text-lg text-carewallet-blue'
          }
        >
          {role?.role === Role.PATIENT ? 'Patient Information' : 'Profile'}
        </Text>
      </View>
      <View className="mx-auto mt-2 flex flex-row items-center">
        {user?.profile_picture ? (
          <View className="mr-4 h-28 w-28">
            <WebView
              source={{ uri: file }}
              className="flex-1 rounded-full border border-carewallet-gray"
            />
          </View>
        ) : (
          <View className="mr-4 h-28 w-28 rounded-full bg-carewallet-lightergray">
            <Text className="my-auto items-center text-center font-carewallet-manrope-bold text-carewallet-blue">
              {user?.first_name.charAt(0)}
              {user?.last_name.charAt(0)}
            </Text>
          </View>
        )}
        <View className="mt-5 flex h-fit max-h-fit min-h-fit flex-row items-center">
          <View className="mb-5 ml-2">
            <Text className="flex-wrap text-left font-carewallet-manrope-bold text-xl text-carewallet-blue">
              {user?.first_name} {user?.last_name}
            </Text>
            <View className="flex w-[60vw] flex-row">
              <View className="flex flex-col">
                <Text className="items-center justify-center text-left font-carewallet-montserrat-bold text-xs text-carewallet-black">
                  {role?.role === Role.PATIENT
                    ? 'PATIENT'
                    : `${_.toUpper(role?.role)} CARETAKER`}
                </Text>
                <Text className="items-center justify-center text-left text-xs  text-carewallet-black">
                  {user?.phone ? user.phone : user?.email}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
