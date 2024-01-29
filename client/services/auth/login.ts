import { auth } from '../../firebase.config';
import { signInWithEmailAndPassword, User } from "firebase/auth";

export const logIn = async (email: string, password: string): Promise<User | null> => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    } catch (error) {
      console.error("Error logging in: ", error);
      return null;
    }
};
