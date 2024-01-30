import { auth } from '../../firebase.config';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  User
} from 'firebase/auth';

export const logIn = async (
  email: string,
  password: string
): Promise<User | Boolean> => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  } catch (error: any) {
    if (error.code === 'auth/user-not-found') {
      try {
        const newUserCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        return newUserCredential.user;
      } catch (creationError) {
        console.error('Error creating user: ', creationError);
        return false;
      }
    } else if (error.code === 'auth/wrong-password') {
      console.error('Incorrect password for existing user.');
      return false;
    } else {
      console.error('Error logging in: ', error);
      return false;
    }
  }
};
