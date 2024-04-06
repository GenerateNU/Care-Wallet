import React, { useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  Text,
  View
} from 'react-native';

import { GroupRole, Role } from '../../types/group';
import { User } from '../../types/user';

interface GroupProps {
  roles: GroupRole[];
  rolesAreLoading: boolean;
  setActiveUser: (userID: string) => void;
  activeUser: string;
  users: User[];
  usersAreLoading: boolean;
}

export function Group({
  roles,
  rolesAreLoading,
  usersAreLoading,
  users,
  setActiveUser,
  activeUser
}: GroupProps) {
  const [canPress, setCanPress] = useState(true);

  if (rolesAreLoading || usersAreLoading) {
    return (
      <View className="-top-20 w-[100vw] flex-1 items-center text-3xl">
        <ActivityIndicator size="large" />
        <Text>Loading...</Text>
      </View>
    );
  }

  if (!roles || !users) {
    return (
      <View className="-top-20 w-[100vw]  flex-1 items-center text-3xl">
        <Text className="text-xl">Could Not Load Group...</Text>
      </View>
    );
  }

  return (
    <View className="items-center">
      <FlatList
        keyboardShouldPersistTaps="always"
        className="h-fit max-h-fit flex-grow-0"
        onScrollBeginDrag={() => setCanPress(false)}
        onScrollEndDrag={() => setCanPress(true)}
        horizontal
        showsHorizontalScrollIndicator={false}
        data={users.filter(
          (user) =>
            user.user_id !== activeUser &&
            user.user_id !==
              (roles.find((role) => role.role === Role.PATIENT)?.user_id ?? '')
        )}
        renderItem={({ item, index }) => (
          <Pressable
            key={index}
            onTouchEnd={() => {
              if (canPress) setActiveUser(item.user_id);
            }}
          >
            <View className="items-center px-2">
              <View className="z-10 h-14 w-14 rounded-full  bg-carewallet-lightergray" />
              <Text className="text-center font-carewallet-manrope-semibold text-xs">
                {item.first_name}
              </Text>
            </View>
          </Pressable>
        )}
      />
    </View>
  );
}
