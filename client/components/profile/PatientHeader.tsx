import React from 'react';
import { Text, View } from 'react-native';

import { WebView } from 'react-native-webview';

import { useProfileFile } from '../../services/file';
import { User } from '../../types/user';

export function PatientHeader({ user }: { user: User | undefined }) {
  const { file } = useProfileFile(user?.profile_picture ?? '');
  return (
    <View className="mx-auto mt-2 flex flex-row items-center">
      {user?.profile_picture ? (
        <View className="mr-4 h-[10vh] w-[10vh]">
          <WebView
            source={{ uri: file }}
            className="flex-1 rounded-full border border-carewallet-gray"
          />
        </View>
      ) : (
        <View className="mr-4 h-[10vh] w-[10vh] rounded-full bg-carewallet-lightergray">
          <Text className="my-auto items-center text-center font-carewallet-manrope-bold text-carewallet-blue">
            {user?.first_name.charAt(0)}
            {user?.last_name.charAt(0)}
          </Text>
        </View>
      )}
      <View className="mt-5 flex h-fit max-h-fit min-h-fit flex-row items-center">
        <View className="mb-5 ml-2">
          <Text className="flex-wrap text-left font-carewallet-manrope-bold text-2xl text-carewallet-blue">
            {user?.first_name} {user?.last_name}
          </Text>
          <View className="flex w-[60vw] flex-row pt-2">
            <View className="flex flex-col">
              <Text className="items-center justify-center text-left font-carewallet-montserrat-bold text-xs text-carewallet-black">
                PATIENT
              </Text>
              <Text className="items-center justify-center text-left text-xs  text-carewallet-black">
                {user?.phone ? user.phone : user?.email}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
