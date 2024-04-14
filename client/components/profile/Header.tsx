import React from 'react';
import { Text, View } from 'react-native';

import { IconButton } from 'react-native-paper';
import WebView from 'react-native-webview';

import Edit from '../../assets/profile/edit.svg';
import { useCareWalletContext } from '../../contexts/CareWalletContext';
import { useFileByGroup } from '../../services/file';
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
  const { user: signedInUser, group } = useCareWalletContext();
  if (!user) return null;
  const { file } = useFileByGroup(group.groupID, user?.profile_picture ?? -1);
  console.log(file);

  return signedInUser.userID === user.user_id ? (
    <View className="flex flex-row items-center border-b border-carewallet-lightgray bg-carewallet-white">
      <View className="ml-2 h-[10vh] w-[10vh]">
        <WebView
          source={{ uri: file }}
          className="flex-1 rounded-full border border-carewallet-gray"
        />
      </View>
      <View className="mt-5 flex h-fit max-h-fit min-h-fit flex-row items-center">
        <View className="mb-5 ml-8">
          <Text className="flex-wrap text-left text-xl font-bold text-carewallet-blue">
            {user.first_name} {user.last_name}
          </Text>
          <View className="flex w-[60vw] flex-row pt-3">
            <View className="flex flex-col">
              <Text className="items-center justify-center text-left text-xs font-semibold text-carewallet-black">
                {`${role?.role} ${role?.role !== Role.PATIENT ? 'CARETAKER' : ''}`}
              </Text>
              <Text className="items-center justify-center text-left text-xs  text-carewallet-black">
                {user.phone ? user.phone : user.email}
              </Text>
            </View>
            <IconButton
              className="absolute -bottom-5 -right-3 ml-auto h-[50px] w-[50px] self-end rounded-xl border border-carewallet-lightgray bg-carewallet-white"
              mode="contained"
              icon={() => <Edit color={'blue'} />}
            />
          </View>
        </View>
      </View>
    </View>
  ) : (
    <View className="flex flex-row items-center border-b border-carewallet-lightgray bg-carewallet-white">
      <View className="my-auto">
        {role?.role === Role.PATIENT ? (
          <BackButton />
        ) : (
          onPress && <NavigationLeftArrow onPress={onPress} />
        )}
      </View>
      {role?.role === Role.PATIENT ? (
        <Text className="mx-auto pr-10 font-carewallet-montserrat-semibold text-xl text-carewallet-blue">
          Patient Information
        </Text>
      ) : (
        <>
          <View className="mx-auto mt-2 flex h-fit max-h-fit min-h-fit flex-row items-center">
            <View className="mb-5 ml-8">
              <Text className="flex-wrap text-center text-xl font-bold text-carewallet-blue">
                {user.first_name} {user.last_name}
              </Text>
              <Text className="mt-3 text-center text-xs font-semibold text-carewallet-black">
                {`${role?.role} CARETAKER`}
              </Text>
              <Text className="text-center text-xs  text-carewallet-black">
                {user.phone ? user.phone : user.email}
              </Text>
            </View>
          </View>
          <View className="mb-3 ml-auto mr-3 h-20 w-20 rounded-full bg-carewallet-lightergray" />
        </>
      )}
    </View>
  );
}
