import { auth } from '../../firebase.config';
import { User } from 'firebase/auth';
import { createUserWithEmailAndPassword } from 'firebase/auth';

export const signUp = async (
  email: string,
  password: string
): Promise<User | String> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  } catch (error: any) {
    console.error('Error signing up: ', error.code);
    return error.code;
  }
};
