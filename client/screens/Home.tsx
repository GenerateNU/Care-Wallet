import React, { useState } from 'react';
import { Pressable, Text, View } from 'react-native';

import { DocPickerButton } from '../components/DocPickerButton';
import { PopupModal } from '../components/PopupModal';
import { useCareWalletContext } from '../contexts/CareWalletContext';
import { useAuth } from '../services/auth';

export default function Home() {
  const [userGroupVisible, setUserGroupVisible] = useState<boolean>(false);

  const { user, group } = useCareWalletContext();

  const { signOutMutation } = useAuth();

  return (
    <View className="bg-white w-[100vw] flex-1 items-center justify-center">
      <View className="flex flex-row items-center">
        <DocPickerButton />
      </View>
      <Pressable
        onPress={() => setUserGroupVisible(true)}
        className="mb-2 w-80 self-center rounded-md border border-carewallet-gray "
      >
        <Text className="self-center text-lg text-carewallet-black">
          Show User and Group Info
        </Text>
      </Pressable>
      <PopupModal isVisible={userGroupVisible} setVisible={setUserGroupVisible}>
        <View>
          <Text className="self-start text-lg">User ID: {user.userID}</Text>
          <Text className="self-start text-lg">
            User Email: {user.userEmail}
          </Text>
          <Text className="self-start text-lg">Group ID: {group.groupID}</Text>
          <Text className="self-start text-lg">Group Role: {group.role}</Text>
        </View>
        <Pressable
          onPress={() => {
            setUserGroupVisible(false);
            signOutMutation();
          }}
          className="w-20 self-center rounded-md border border-carewallet-gray"
        >
          <Text className="self-center text-lg text-carewallet-gray">
            Sign Out
          </Text>
        </Pressable>
      </PopupModal>
    </View>
  );
}
