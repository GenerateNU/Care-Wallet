import React from 'react';
import { Text, View } from 'react-native';

import Home from '../assets/task-creation/home.svg';
import Other from '../assets/task-creation/other.svg';
import RedPill from '../assets/task-creation/red-pill.svg';

export function GetLabelPill({ category }: { category: string }) {
  switch (category) {
    case 'med_mgmt': {
      return (
        <View className="ml-2 h-8 w-fit flex-row items-center justify-center space-x-2 rounded-3xl border border-carewallet-lightgray bg-carewallet-coral px-2">
          <RedPill></RedPill>
          <Text className="font-carewallet-manrope text-sm text-carewallet-pink">
            Medication Management
          </Text>
        </View>
      );
    }
    case 'dr_appt': {
      return (
        <View className="ml-2 h-8 w-fit flex-row items-center justify-center space-x-2 rounded-3xl border border-carewallet-lightgray bg-carewallet-yellow px-2">
          <Home></Home>
          <Text className="font-carewallet-manrope text-sm text-carewallet-orange">
            Doctors Appointment
          </Text>
        </View>
      );
    }
    case 'financial': {
      return (
        <View className="ml-2 h-8 w-fit flex-row items-center justify-center space-x-2 rounded-3xl border border-carewallet-lightgray bg-carewallet-orange px-2">
          <Other></Other>
          <Text className="font-carewallet-manrope text-sm text-carewallet-coral">
            Financial
          </Text>
        </View>
      );
    }
  }
}
