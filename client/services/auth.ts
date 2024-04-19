import { Alert } from 'react-native';

import { useMutation } from '@tanstack/react-query';
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

export const useAuth = () => {
  const { mutate: logInMutation } = useMutation({
    mutationFn: (authProps: AuthProps) => logIn(authProps),
    onError: (error) => {
      Alert.alert('Login Failed', error.message);
    }
  });

  const { mutate: signUpMutation } = useMutation({
    mutationFn: (authProps: AuthProps) => signUp(authProps),
    onError: (error) => {
      Alert.alert('Error Signing Up: ', error.message);
    }
  });

  const { mutate: signOutMutation } = useMutation({
    mutationFn: () => signOut(),
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
