import { useMutation } from '@tanstack/react-query';
import { auth } from '../firebase.config';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  User,
  onAuthStateChanged as firebaseOnAuthStateChanged
} from 'firebase/auth';
import { Alert } from 'react-native';

interface AuthProps {
  email: string;
  password: string;
}

const logIn = async ({ email, password }: AuthProps) => {
  return await signInWithEmailAndPassword(auth, email, password);
};

const signUp = async ({ email, password }: AuthProps) => {
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const useAuth = () => {
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

  return {
    logInMutation,
    signUpMutation
  };
};

export const onAuthStateChanged = (
  callback: (user: User | null) => void
): void => {
  firebaseOnAuthStateChanged(auth, (user: User | null) => {
    callback(user);
  });
};
