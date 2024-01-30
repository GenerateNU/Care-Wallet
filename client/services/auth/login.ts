import { auth } from '../../firebase.config';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  User
} from 'firebase/auth';

export const logIn = async (
  email: string,
  password: string
): Promise<User | string> => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  } catch (error: any) {
    console.error('Error logging in: ', error.code);
    if (error.code === 'auth/user-not-found') {
      try {
        const newUserCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        return newUserCredential.user;
      } catch (creationError: any) {
        console.error('Error creating user: ', creationError.code);
        return creationError.code;
      }
    } else {
      return error.code;
    }
  }
};
