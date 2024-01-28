import { auth } from '../../firebase.config';
import { User } from "firebase/auth";

export const logIn = async (email: string, password: string): Promise<User | null> => {
    try {
      const userCredential = await auth.signInWithEmailAndPassword(email, password);
      return userCredential.user;
    } catch (error) {
      console.error("Error logging in: ", error);
      return null;
    }
  };
  