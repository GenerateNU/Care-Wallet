import React from 'react';
import { Text, View } from 'react-native';

interface FileTaskProps {
  name: string;
  label: string;
}

export function FileTask({}: FileTaskProps): JSX.Element {
  return (
    <View className="bg-white border-black inline-flex h-[90px] w-[346px] items-start justify-start gap-5 rounded-[10px] border border-opacity-20 p-[15px]">
      <View className="bg-white border-black h-[60px] w-[60px] rounded-full border border-opacity-20" />
      <Text className="text-black w-[223px] font-['Urbanist'] text-lg font-semibold"></Text>
      <Text className="text-black absolute left-0 top-0 w-[223px] font-['Urbanist'] text-lg font-semibold">
        X-Rays
      </Text>
      <Text className="text-black absolute left-0 top-[22px] w-[223px] font-['Manrope'] text-sm font-normal">
        Doctor’s Appointment
        <br />
        Grandpa’s Hip Checkup
      </Text>
    </View>
  );
}

export default FileTask;
