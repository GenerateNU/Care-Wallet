import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import FileDock from '../../assets/profile/filedock.svg';
import Upload from '../../assets/profile/upload.svg';
import { Header } from '../../components/profile/Header';
import { useCareWalletContext } from '../../contexts/CareWalletContext';
import { MainLayout } from '../../layouts/MainLayout';
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
    <View>
      <View className="h-[8vh] bg-carewallet-white" />
      <MainLayout>
        <ScrollView>
          <View className="flex h-[80vh] flex-col">
            <Header
              user={users?.find((user) => user.user_id === patientId)}
              role={roles?.find((role) => role.user_id === patientId)}
            />
            <View className="mt-3 w-[80vw] self-center">
              <Text className="pt-2 text-center font-carewallet-manrope-bold text-lg text-carewallet-black">
                View Health Stats
              </Text>
              <View className="mt-2 items-center justify-center rounded-xl">
                <Text className="font-carewallet-manrope">
                  There are no health stats to view.
                </Text>
              </View>
            </View>
            <View className="mx-auto mt-auto flex flex-row space-x-3 pr-10">
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
        </ScrollView>
      </MainLayout>
    </View>
  );
}
