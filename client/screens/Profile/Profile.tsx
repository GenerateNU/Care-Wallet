import React, { useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import Folder from '../../assets/profile/folderopen.svg';
import RightArrow from '../../assets/profile/rightarrow.svg';
import Settings from '../../assets/profile/settings.svg';
import { CircleCard } from '../../components/profile/CircleCard';
import { Group } from '../../components/profile/Group';
import { Header } from '../../components/profile/Header';
import { UserTaskStatusCard } from '../../components/profile/UserTaskStatusCard';
import { useCareWalletContext } from '../../contexts/CareWalletContext';
import { MainLayout } from '../../layouts/MainLayout';
import { AppStackNavigation } from '../../navigation/types';
import { useAuth } from '../../services/auth';
import { useGroup } from '../../services/group';
import { useUsers } from '../../services/user';

export default function Profile() {
  const navigation = useNavigation<AppStackNavigation>();
  const { user: signedInUser, group } = useCareWalletContext();
  const [activeUser, setActiveUser] = useState(signedInUser.userID);
  const { roles, rolesAreLoading } = useGroup(group.groupID);
  const { users, usersAreLoading } = useUsers(
    roles?.map((role) => role.user_id) ?? []
  );

  const { signOutMutation } = useAuth();

  if (rolesAreLoading || usersAreLoading) {
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
    <View>
      <View className="h-[8vh] bg-carewallet-white" />

      <MainLayout>
        <Header
          user={users.find((user) => user.user_id === activeUser)}
          role={roles.find((role) => role.user_id === activeUser)}
          onPress={() => setActiveUser(signedInUser.userID)}
        />
        <View>
          <Group
            users={users ?? []}
            usersAreLoading={usersAreLoading}
            setActiveUser={setActiveUser}
            activeUser={activeUser}
            roles={roles ?? []}
            rolesAreLoading={rolesAreLoading}
          />
          <View
            className="mt-5 items-center pb-5"
            onTouchEnd={async () => {
              navigation.navigate('TaskList');
            }}
          >
            <UserTaskStatusCard userID={activeUser} />
          </View>
          {signedInUser.userID === activeUser && (
            <View className="h-[22vh]">
              <View>
                <View className="mb-5 items-center">
                  <CircleCard
                    Icon={<Folder />}
                    ButtonText="View Patient Information"
                    onTouchEnd={() => navigation.navigate('PatientView')}
                  />
                </View>
                <View>
                  <View
                    className="items-center"
                    onTouchEnd={() => navigation.navigate('Settings')}
                  >
                    <CircleCard Icon={<Settings />} ButtonText="Settings" />
                  </View>
                </View>
              </View>
              <View className="mt-auto items-center">
                <CircleCard
                  Icon={<RightArrow />}
                  ButtonText="Log Out"
                  onTouchEnd={() => signOutMutation()}
                />
              </View>
            </View>
          )}
        </View>
      </MainLayout>
    </View>
  );
}
