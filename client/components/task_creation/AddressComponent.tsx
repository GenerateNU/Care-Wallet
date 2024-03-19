import React from 'react';
import { Text, TextInput, View } from 'react-native';

export function AddressComponent() {
  return (
    <View className="flex h-full items-center justify-center">
      <View className="w-3/4">
        <View className="mb-4">
          <Text className="font-bold">Street Address</Text>
          <TextInput
            className="border-gray-300 w-full rounded-md border px-4 py-2"
            placeholder="Enter street address"
          />
        </View>
        <View className="mb-4 flex flex-row">
          <View className="mr-2 w-1/2">
            <Text className="font-bold">City</Text>
            <TextInput
              className="border-gray-300 w-full rounded-md border px-4 py-2"
              placeholder="Enter city"
            />
          </View>
          <View className="ml-2 w-1/2">
            <Text className="font-bold">State</Text>
            <TextInput
              className="border-gray-300 w-full rounded-md border px-4 py-2"
              placeholder="Enter state"
            />
          </View>
        </View>
        <View className="mb-4 flex flex-row">
          <View className="mr-2 w-1/2">
            <Text className="font-bold">Zip Code</Text>
            <TextInput
              className="border-gray-300 w-full rounded-md border px-4 py-2"
              placeholder="Enter zip code"
              keyboardType="numeric"
            />
          </View>
          <View className="ml-2 w-1/2">
            <Text className="font-bold">Phone Number</Text>
            <TextInput
              className="border-gray-300 w-full rounded-md border px-4 py-2"
              placeholder="Enter phone number"
              keyboardType="phone-pad"
            />
          </View>
        </View>
      </View>
    </View>
  );
}
