import React, { createContext, useContext, useEffect, useState } from 'react';

import { getAuth, onAuthStateChanged } from 'firebase/auth';

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

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      const signedInUser: User = {
        userID: user?.uid ?? '',
        userEmail: user?.email ?? ''
      };

      setUser(signedInUser);

      setGroup({
        groupID: 5,
        role: 'TEMP'
      });
    });
  }, []);

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
