import React from 'react';
import { Pressable, Text, View } from 'react-native';

import Folder from '../../assets/profile/folderopen.svg';
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
      <View className="mb-5 mt-5 items-center">
        <CircleCard ButtonText="View Current Health Stats" Icon={<Folder />} />
      </View>
      <View className="h-[45vh] w-[80vw] self-center rounded-lg border border-carewallet-lightgray bg-carewallet-white">
        <Text className="text-md pt-2 text-center font-carewallet-manrope-semibold font-semibold text-carewallet-black">
          View Past Health Stats
        </Text>
        <HealthStats />
      </View>
      <View className="flex flex-row space-x-3">
        <Pressable className="ml-10 mt-5 h-[10vh] w-[38vw] rounded-lg border border-carewallet-lightgray">
          <Text className="my-auto text-center font-carewallet-manrope text-sm text-carewallet-black">
            Upload Files
          </Text>
        </Pressable>
        <Pressable className="ml-2 mt-5 h-[10vh] w-[38vw] rounded-lg border border-carewallet-lightgray">
          <Text className="my-auto text-center font-carewallet-manrope text-sm text-carewallet-black">
            View Files
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
