import { Alert } from 'react-native';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged as firebaseOnAuthStateChanged,
  signInWithEmailAndPassword,
  User,
  UserCredential
} from 'firebase/auth';

import { auth } from '../firebase.config';

interface AuthProps {
  email: string;
  password: string;
}

const logIn = async ({ email, password }: AuthProps): Promise<UserCredential> =>
  await signInWithEmailAndPassword(auth, email, password);

const signUp = async ({
  email,
  password
}: AuthProps): Promise<UserCredential> =>
  await createUserWithEmailAndPassword(auth, email, password);

const signOut = async () => await auth.signOut();

// TODO: update to use a toast instead of an alert
export const useAuth = () => {
  const queryClient = useQueryClient();

  const { mutate: logInMutation } = useMutation({
    mutationFn: (authProps: AuthProps) => logIn(authProps),
    onSuccess: () => {
      Alert.alert('Login Success', 'Welcome back!');
    },
    onError: (error) => {
      Alert.alert('Login Failed', error.message);
    }
  });

  const { mutate: signUpMutation } = useMutation({
    mutationFn: (authProps: AuthProps) => signUp(authProps),
    onSuccess: () => {
      Alert.alert('Signup Success', 'Welcome to the app!');
    },
    onError: (error) => {
      Alert.alert('Error Signing Up: ', error.message);
    }
  });

  const { mutate: signOutMutation } = useMutation({
    mutationFn: () => signOut(),
    onSuccess: () => {
      Alert.alert('Sign Out Success', 'You have been signed out');
      queryClient.invalidateQueries({
        queryKey: ['medList'] // mark medlist as stale so it refetches on signin
      });
    },
    onError: (error) => {
      Alert.alert('Error Signing Out: ', error.message);
    }
  });

  return {
    logInMutation,
    signUpMutation,
    signOutMutation
  };
};

export const onAuthStateChanged = (
  callback: (user: User | null) => void
): void => {
  firebaseOnAuthStateChanged(auth, (user: User | null) => {
    callback(user);
  });
};
