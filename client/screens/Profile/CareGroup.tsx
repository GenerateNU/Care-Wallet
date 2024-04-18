import React, { useState } from 'react';
import { ActivityIndicator, ScrollView, View } from 'react-native';

import { TouchableOpacity } from '@gorhom/bottom-sheet';
import { useNavigation } from '@react-navigation/native';
import { Button, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

import Settings from '../../assets/profile/settings.svg';
import { BackButton } from '../../components/nav_buttons/BackButton';
import { AddButtom } from '../../components/profile/AddButton';
import { CareTaker } from '../../components/profile/CareTaker';
import { useCareWalletContext } from '../../contexts/CareWalletContext';
import { AppStackNavigation } from '../../navigation/types';
import { useGroup } from '../../services/group';
import { useUsers } from '../../services/user';
import { Role } from '../../types/group';

export function CareGroup() {
  const navigation = useNavigation<AppStackNavigation>();
  const { user: signedInUser, group } = useCareWalletContext();
  const [activeUser, setActiveUser] = useState(signedInUser.userID);
  const { roles, rolesAreLoading } = useGroup(group.groupID);
  const { users, usersAreLoading } = useUsers(
    roles?.map((role) => role.user_id) ?? []
  );

  const patientId = roles?.find((role) => role.role === Role.PATIENT)?.user_id;

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
    <SafeAreaView className="bg-carewallet-white">
      <ScrollView className="h-ful">
        <View className="flex flex-row items-center border-b border-carewallet-lightgray pb-5">
          <View className="pl-2">
            <BackButton />
          </View>
          <View className="mx-auto ">
            <Text className="text-center font-carewallet-manrope-bold text-lg text-carewallet-blue ">
              Care Group
            </Text>
          </View>
          <View className="pr-2">
            <AddButtom />
          </View>
        </View>

        <View className="bg-carewallet-lightergray">
          <View className="flex h-[10vh] items-center">
            <View className="h-[10vh] scroll-pb-96">
              <View className="flex w-full flex-row justify-end text-carewallet-black">
                <Button
                  className="mx-auto mt-2 h-[50px] w-[96vw] items-start justify-center rounded-xl border-carewallet-lightgray bg-carewallet-white"
                  textColor="#000000"
                  mode="outlined"
                  icon={() => <Settings />} // Example using FontAwesome icon
                >
                  <Text className="font-carewallet-manrope-semibold">
                    Manage Caregiver Capabiities
                  </Text>
                </Button>
              </View>
            </View>
          </View>

          <View className="mx-2 mt-2 flex w-[96vw] flex-col items-center rounded-xl">
            {users
              .filter(
                (user) =>
                  user.user_id !== patientId && user.user_id !== activeUser
              )
              .map((user) => (
                <TouchableOpacity
                  key={user.user_id} // <-- Add key prop here
                  onPress={() => {
                    setActiveUser(user.user_id);
                    navigation.navigate('Profile');
                  }}
                >
                  <CareTaker
                    user={user}
                    role={roles.find((role) => role.user_id === user.user_id)}
                  />
                </TouchableOpacity>
              ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
