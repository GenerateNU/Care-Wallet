import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, TextInput, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import Wally from '../../assets/Wally.svg';
import { useCareWalletContext } from '../../contexts/CareWalletContext';
import { MainLayout } from '../../layouts/MainLayout';
import { AppStackNavigation } from '../../navigation/types';
import { useAuth } from '../../services/auth';
import { useGroupMutation } from '../../services/group';
import { useUser } from '../../services/user';

export default function Register() {
  const navigation = useNavigation<AppStackNavigation>();
  const [form, setForm] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phone: '',
    address: ''
  });
  const { user } = useCareWalletContext();

  const { signUpMutation } = useAuth();
  const { addUserMutation } = useUser(user.userID);
  const { addUserToGroupMutation } = useGroupMutation(5); // TODO: REMOVE THIS AFTER SHOWCASE, WE CURRENTLY DONT HAVE A WAY TO CREATE A CAREGROUP

  useEffect(() => {
    if (user.userID) {
      addUserMutation({
        email: form.email,
        first_name: form.firstName,
        last_name: form.lastName,
        phone: form.phone,
        address: form.address,
        user_id: user.userID,
        device_id: '',
        pfp_s3_url: '',
        push_notification_enabled: false
      });

      addUserToGroupMutation({ userId: user.userID, role: 'SECONDARY' });

      navigation.navigate('Main');
      return;
    }
  }, [user]);

  const handleSignUp = async () => {
    signUpMutation({ email: form.email, password: form.password });
  };

  return (
    <MainLayout>
      <View className="h-[93vh]">
        <View className="mt-auto h-[75vh] w-[100vw] rounded-3xl bg-carewallet-white shadow-lg ">
          <View className="absolute -top-16 left-8">
            <Wally className="h-20 w-20" />
          </View>
          <SafeAreaView className="flex-1">
            <View className="mx-auto my-10 w-[80vw]">
              <Text className="mb-10 font-carewallet-manrope-bold text-xl text-carewallet-blue">
                Register for an account
              </Text>
              <View className="flex flex-row">
                <View className="w-[40vw]">
                  <Text className="mr-auto mt-5 font-carewallet-manrope-bold text-2xs">
                    FIRST NAME
                  </Text>
                  <TextInput
                    className="my-2.5 w-full rounded border-b border-carewallet-lightgray py-2"
                    value={form.firstName}
                    onChangeText={(firstName) =>
                      setForm({ ...form, firstName })
                    }
                    placeholder="john"
                  />
                </View>
                <View className="ml-2 w-[40vw]">
                  <Text className="mr-auto mt-5 font-carewallet-manrope-bold text-2xs">
                    LAST NAME
                  </Text>
                  <TextInput
                    className="my-2.5 w-full rounded border-b border-carewallet-lightgray py-2"
                    value={form.lastName}
                    onChangeText={(lastName) => setForm({ ...form, lastName })}
                    placeholder="doe"
                  />
                </View>
              </View>
              <Text className="mr-auto mt-5 font-carewallet-manrope-bold text-2xs">
                EMAIL
              </Text>
              <TextInput
                className="my-2.5 w-full rounded border-b border-carewallet-lightgray py-2"
                value={form.email}
                onChangeText={(email) => setForm({ ...form, email })}
                placeholder="email@email.com"
                keyboardType="email-address"
              />
              <Text className="mr-auto mt-5 font-carewallet-manrope-bold text-2xs">
                PASSWORD
              </Text>
              <TextInput
                className="my-2.5 w-full rounded border-b border-carewallet-lightgray py-2"
                value={form.password}
                onChangeText={(password) => setForm({ ...form, password })}
                placeholder="1234"
                secureTextEntry
              />
              <Text className="mr-auto mt-5 font-carewallet-manrope-bold text-2xs">
                PHONE NUMBER
              </Text>
              <TextInput
                className="my-2.5 w-full rounded border-b border-carewallet-lightgray py-2"
                value={form.phone}
                onChangeText={(phone) => setForm({ ...form, phone })}
                placeholder="(000) 000-0000"
                keyboardType="phone-pad"
              />
            </View>
            <View className="mx-auto mb-8 mt-auto">
              <View
                onTouchEnd={handleSignUp}
                className="mb-2 h-9 w-[80vw] items-center justify-center rounded-md bg-carewallet-blue"
              >
                <Text className="self-center font-carewallet-manrope-semibold text-base  text-carewallet-white">
                  Sign Up
                </Text>
              </View>
              <View
                onTouchEnd={() => navigation.navigate('Login')}
                className="h-9 w-[80vw] items-center justify-center self-center rounded-md border border-carewallet-lightgray"
              >
                <Text className="self-center font-carewallet-manrope-semibold text-base text-carewallet-blue">
                  Have an Account? Log in
                </Text>
              </View>
            </View>
          </SafeAreaView>
        </View>
      </View>
    </MainLayout>
  );
}
