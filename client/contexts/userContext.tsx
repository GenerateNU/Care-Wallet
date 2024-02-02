import React, { createContext, useContext, useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { User } from '../types/user';

type UserContextData = {
  user: User;
};

const UserContext = createContext({} as UserContextData);

// TODO: Add Group ID, and User Role to this.
// TODO: Should maybe be a group prop and not inside user.
// TODO: make name more generic
export default function UserProvider({ children }: { children: any }) {
  const [user, setUser] = useState({} as User);
  const auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      const signedInUser: User = {
        userID: user?.uid ?? '',
        userEmail: user?.email ?? ''
      };
      setUser(signedInUser);
    });
  }, []);

  const UserStore: UserContextData = {
    user: user
  };

  return (
    <UserContext.Provider value={UserStore}>{children}</UserContext.Provider>
  );
}

export const useUser = (): UserContextData => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }

  return context;
};
