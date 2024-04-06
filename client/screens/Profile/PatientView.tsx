import React from 'react';
import { Pressable, Text, View } from 'react-native';

import { CircleCard } from '../../components/profile/CircleCard';
import { Header } from '../../components/profile/Header';
import { HealthStats } from '../../components/profile/HealthStats';
import { useCareWalletContext } from '../../contexts/CareWalletContext';
import { useGroup } from '../../services/group';
import { useUsers } from '../../services/user';
import { Role } from '../../types/group';

export default function PatientView() {
  const { group } = useCareWalletContext();
  const { roles } = useGroup(group.groupID);
  const { users } = useUsers(roles?.map((role) => role.user_id) ?? []);
  const patientId = roles?.find((role) => role.role === Role.PATIENT)?.user_id;

  return (
    <View className="flex flex-1 flex-col">
      <Header
        user={users?.find((user) => user.user_id === patientId)}
        role={roles?.find((role) => role.user_id === patientId)}
      />
      <View className="mb-5 items-center">
        <CircleCard ButtonText="View Current Health Stats" />
      </View>
      <View className="h-[35vh] w-[80vw] self-center rounded-lg border">
        <Text className="text-md pt-2 text-center font-semibold text-carewallet-black">
          View Past Health Stats
        </Text>
        <HealthStats />
      </View>
      <View className="flex flex-row space-x-10">
        <Pressable className="ml-10 mt-5 h-[10vh] w-[35vw] rounded-lg border">
          <Text className="my-auto text-center text-lg text-carewallet-black">
            Upload Files
          </Text>
        </Pressable>
        <Pressable className="ml-2 mt-5 h-[10vh] w-[35vw] rounded-lg border">
          <Text className="my-auto text-center text-lg text-carewallet-black">
            View Files
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
