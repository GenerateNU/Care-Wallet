import React from 'react';
import { Text, View } from 'react-native';

import { User } from '../../types/user';

export function PatientHeader({ user }: { user: User | undefined }) {
  return (
    <View className="mx-auto mt-2 flex flex-row items-center">
      <View className="my-auto mb-3 ml-3 h-20 w-20 rounded-full bg-carewallet-lightergray" />
      <View className="mt-5 flex h-fit max-h-fit min-h-fit flex-row items-center">
        <View className="mb-5 ml-8">
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
