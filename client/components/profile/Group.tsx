import React, { useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  Text,
  View
} from 'react-native';

import WebView from 'react-native-webview';

import { useCareWalletContext } from '../../contexts/CareWalletContext';
import { useFileByGroup } from '../../services/file';
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
  const { user: signedInUser } = useCareWalletContext();
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
            user.user_id !== signedInUser.userID &&
            user.user_id !==
              (roles.find((role) => role.role === Role.PATIENT)?.user_id ?? '')
        )}
        renderItem={({ item, index }) => {
          return (
            <Pressable
              key={index}
              onTouchEnd={() => {
                if (canPress) setActiveUser(item.user_id);
              }}
            >
              <SmallProfileImage user={item} />
            </Pressable>
          );
        }}
      />
    </View>
  );
}

function SmallProfileImage({ user }: { user: User }) {
  const { group } = useCareWalletContext();
  const { file } = useFileByGroup(group.groupID, user?.profile_picture ?? -1);
  console.log(file);
  return (
    <View className="items-center px-2">
      <View className="ml-2 h-14 w-14">
        <WebView
          source={{ uri: file }}
          className="flex-1 rounded-full border border-carewallet-gray"
        />
      </View>
      <Text className="text-center font-carewallet-manrope-semibold text-xs">
        {user.first_name}
      </Text>
    </View>
  );
}
