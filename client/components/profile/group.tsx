import React from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';

import { useCareWalletContext } from '../../contexts/CareWalletContext';
import { useGroup } from '../../services/group';
import { useUsers } from '../../services/user';

export function Group() {
  const { group: carewalletGroup } = useCareWalletContext();

  const { roles, rolesAreLoading } = useGroup(carewalletGroup.groupID);

  const { users, usersAreLoading } = useUsers(
    roles?.map((role) => role.user_id) || []
  );

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
    <FlatList
      className="h-fit max-h-fit flex-grow-0"
      horizontal
      showsHorizontalScrollIndicator={false}
      data={users}
      renderItem={({ item }) => (
        <View className="items-center px-2">
          <View className="z-10 h-20 w-20 rounded-full border border-carewallet-black bg-carewallet-white" />
          <Text className="text-center">{item.first_name}</Text>
        </View>
      )}
    />
  );
}
