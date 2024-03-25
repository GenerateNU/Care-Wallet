import React, { createContext, useContext, useEffect, useState } from 'react';

import { getAuth, onAuthStateChanged } from 'firebase/auth';

import { useUserGroup } from '../services/group';
import { Group, User } from './types';

type CareWalletContextData = {
  user: User;
  group: Group;
};

const CareWalletContext = createContext({} as CareWalletContextData);

export function CareWalletProvider({
  children
}: {
  children: JSX.Element | JSX.Element[];
}) {
  const [user, setUser] = useState({} as User);
  const [group, setGroup] = useState({} as Group);
  const auth = getAuth();

  const { userGroupRole, userGroupRoleIsLoading } = useUserGroup(user.userID);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      const signedInUser: User = {
        userID: user?.uid ?? '',
        userEmail: user?.email ?? ''
      };

      setUser(signedInUser);
    });
  }, []);

  useEffect(() => {
    if (userGroupRole && !userGroupRoleIsLoading)
      setGroup({
        groupID: userGroupRole.group_id,
        role: userGroupRole.role
      });
  }, [userGroupRole]);

  const CareWalletContextStore: CareWalletContextData = {
    user: user,
    group: group
  };

  return (
    <CareWalletContext.Provider value={CareWalletContextStore}>
      {children}
    </CareWalletContext.Provider>
  );
}

export const useCareWalletContext = (): CareWalletContextData => {
  const context = useContext(CareWalletContext);

  if (!context) {
    throw new Error(
      'useCareWalletContext must be used within a CareWalletContextProvider'
    );
  }

  return context;
};
