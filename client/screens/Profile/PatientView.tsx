import React from 'react';
import { Pressable, SafeAreaView, Text, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import FileDock from '../../assets/profile/filedock.svg';
import Upload from '../../assets/profile/upload.svg';
import { Header } from '../../components/profile/Header';
import { HealthStats } from '../../components/profile/HealthStats';
import { useCareWalletContext } from '../../contexts/CareWalletContext';
import { AppStackNavigation } from '../../navigation/types';
import { useGroup } from '../../services/group';
import { useUsers } from '../../services/user';
import { Role } from '../../types/group';

export default function PatientView() {
  const { group } = useCareWalletContext();
  const { roles } = useGroup(group.groupID);
  const { users } = useUsers(roles?.map((role) => role.user_id) ?? []);
  const patientId = roles?.find((role) => role.role === Role.PATIENT)?.user_id;
  const navigation = useNavigation<AppStackNavigation>();

  return (
    <SafeAreaView className="flex-1 bg-carewallet-white">
      <View className="flex flex-1 flex-col bg-carewallet-white/80">
        <Header
          user={users?.find((user) => user.user_id === patientId)}
          role={roles?.find((role) => role.user_id === patientId)}
        />
        <View className="mt-3 h-[50vh] w-[80vw] self-center rounded-xl border border-carewallet-lightgray bg-carewallet-white">
          <Text className="pt-2 text-center font-carewallet-manrope text-lg font-semibold text-carewallet-black">
            View Health Stats
          </Text>
          <HealthStats />
        </View>
        <View className="mx-auto flex flex-row space-x-3 pr-10">
          <Pressable
            onPress={() => navigation.navigate('FileUploadScreen')}
            className="ml-10 mt-5 flex h-10 w-[38vw] flex-row items-center justify-center space-x-2 rounded-lg border border-carewallet-lightgray bg-carewallet-white"
          >
            <Upload />
            <Text className="my-auto text-center font-carewallet-manrope-semibold text-carewallet-black">
              Upload Files
            </Text>
          </Pressable>
          <Pressable
            onPress={() => navigation.navigate('FileViewScreen')}
            className="ml-2 mt-5 flex h-10 w-[38vw] flex-row items-center justify-center space-x-2 rounded-lg border border-carewallet-lightgray bg-carewallet-white"
          >
            <FileDock />
            <Text className="my-auto text-center font-carewallet-manrope-semibold text-carewallet-black">
              View Files
            </Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}
