import React, { useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { CircleCard } from '../../components/profile/CircleCard';
import { Group } from '../../components/profile/Group';
import { Header } from '../../components/profile/Header';
import { useCareWalletContext } from '../../contexts/CareWalletContext';
import { AppStackNavigation } from '../../navigation/types';
import { useAuth } from '../../services/auth';
import { useGroup } from '../../services/group';
import { useTaskByAssigned } from '../../services/task';
import { useUsers } from '../../services/user';

export default function Profile() {
  const navigation = useNavigation<AppStackNavigation>();
  const { user: signedInUser, group } = useCareWalletContext();
  const [activeUser, setActiveUser] = useState(signedInUser.userID);
  const { roles, rolesAreLoading } = useGroup(group.groupID);
  const { users, usersAreLoading } = useUsers(
    roles?.map((role) => role.user_id) ?? []
  );
  const { taskByUser, taskByUserIsLoading } = useTaskByAssigned(activeUser);

  const { signOutMutation } = useAuth();

  if (rolesAreLoading || usersAreLoading || taskByUserIsLoading) {
    return (
      <View className="w-full flex-1 items-center justify-center bg-carewallet-white text-3xl">
        <ActivityIndicator size="large" />
        <Text>Loading...</Text>
      </View>
    );
  }

  if (!roles || !users) {
    return (
      <View className="w-full flex-1 items-center justify-center bg-carewallet-white text-3xl">
        <Text className="text-xl">Could Not Load Profile...</Text>
      </View>
    );
  }

  return (
    <View className="flex flex-1 flex-col">
      <Header
        user={users.find((user) => user.user_id === activeUser)}
        role={roles.find((role) => role.user_id === activeUser)}
      />
      <Group
        users={users ?? []}
        usersAreLoading={usersAreLoading}
        setActiveUser={setActiveUser}
        activeUser={activeUser}
        roles={roles ?? []}
        rolesAreLoading={rolesAreLoading}
      />
      <View
        className="mt-5 flex items-center pb-5"
        onTouchEnd={() => navigation.navigate('TaskList')}
      >
        <View className="h-20 w-80 items-center justify-center rounded-xl border border-carewallet-black">
          <Text className="text-md">Your Tasks</Text>
          <Text className="text-2xl">{taskByUser?.length ?? 0}</Text>
        </View>
      </View>
      <View className="mb-5 items-center">
        <CircleCard
          ButtonText="View Patient Information"
          onTouchEnd={() => navigation.navigate('PatientView')}
        />
      </View>
      <View className="mb-auto flex-1 items-center">
        <CircleCard ButtonText="Settings" />
      </View>
      <View className="flex-1 items-center">
        <CircleCard
          ButtonText="View Files"
          onTouchEnd={() => navigation.navigate('FileUploadScreen')}
        />
      </View>
      <View className="items-center pb-5">
        <CircleCard ButtonText="Log Out" onTouchEnd={() => signOutMutation()} />
      </View>
    </View>
  );
}
