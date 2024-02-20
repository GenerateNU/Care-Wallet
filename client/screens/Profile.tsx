import React from 'react';
import { Text } from 'react-native';

import { Header } from '../components/profile/header';
import { useCareWalletContext } from '../contexts/CareWalletContext';
import { useUser } from '../services/user';

export default function Profile() {
  const { user: carewalletUser } = useCareWalletContext();
  const { user, userIsLoading } = useUser(carewalletUser.userID);

  if (userIsLoading) {
    return <Text>Loading...</Text>;
  }

  if (!user) {
    return <Text>User not found</Text>;
  }

  return <Header user={user} />;
}
