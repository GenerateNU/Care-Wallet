import React from 'react';
import { Text, View } from 'react-native';

import { IconButton } from 'react-native-paper';

import Edit from '../../assets/profile/edit.svg';
import { GroupRole, Role } from '../../types/group';
import { User } from '../../types/user';

interface HeaderProps {
  user: User | undefined;
  role: GroupRole | undefined;
}

export function Header({ user, role }: HeaderProps) {
  if (!user) return null;

  return (
    <View className="flex flex-row items-center border-b border-carewallet-lightgray bg-carewallet-white">
      <View className="mb-3 ml-3 h-20 w-20 rounded-full bg-carewallet-lightergray" />
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
              <Text className="items-center justify-center text-left text-xs font-bold  text-carewallet-black">
                {user.phone ? user.phone : user.email}
              </Text>
            </View>
            <IconButton
              className="absolute -bottom-5 right-0 ml-auto h-[50px] w-[50px] self-end rounded-xl border border-carewallet-lightgray bg-carewallet-white"
              mode="contained"
              icon={() => <Edit color={'blue'} />}
            />
          </View>
        </View>
      </View>
    </View>
  );
}
