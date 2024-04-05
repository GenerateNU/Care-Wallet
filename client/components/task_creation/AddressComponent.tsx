import React from 'react';
import { Text, TextInput, View } from 'react-native';

export function AddressComponent() {
  return (
    <View>
      <View className="m-4 mb-0">
        <Text className="mb-2 font-carewallet-montserrat-semibold text-[14px]">
          STREET ADDRESS
        </Text>
        <TextInput
          className="w-full rounded-md border border-carewallet-gray bg-carewallet-white px-4 py-2"
          placeholder={'Fill in blank'}
          autoComplete="street-address"
        />
      </View>

      <View className="m-4 mb-0 flex flex-row">
        <View className="w-[49%]">
          <Text className="mb-2 font-carewallet-montserrat-semibold text-[14px]">
            CITY
          </Text>
          <TextInput
            className="border-gray-300 w-full rounded-md border border-carewallet-gray bg-carewallet-white px-4 py-2"
            placeholder={'Fill in blank'}
          />
        </View>
        <View className="ml-2 w-[49%]">
          <Text className="mb-2 font-carewallet-montserrat-semibold text-[14px]">
            STATE
          </Text>
          <TextInput
            className="border-gray-300 w-full rounded-md border border-carewallet-gray bg-carewallet-white px-4 py-2"
            placeholder={'Fill in blank'}
          />
        </View>
      </View>

      <View className="m-4 mb-0 flex flex-row">
        <View className="w-[49%]">
          <Text className="mb-2 font-carewallet-montserrat-semibold text-[14px]">
            ZIP CODE
          </Text>
          <TextInput
            className="border-gray-300 w-full rounded-md border border-carewallet-gray bg-carewallet-white px-4 py-2"
            placeholder={'Fill in blank'}
            autoComplete="postal-code"
            keyboardType="numeric"
          />
        </View>
        <View className="ml-2 w-[49%]">
          <Text className="mb-2 font-carewallet-montserrat-semibold text-[14px]">
            PHONE NUMBER
          </Text>
          <TextInput
            className="border-gray-300 w-full rounded-md border border-carewallet-gray bg-carewallet-white px-4 py-2"
            placeholder={'Fill in blank'}
            autoComplete="tel"
            keyboardType="phone-pad"
          />
        </View>
      </View>
    </View>
  );
}
