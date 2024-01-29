import { auth } from '../../firebase.config';
import { User } from "firebase/auth";


export const signUp = async (email: string, password: string): Promise<User | null> => {
    try {
        const userCredential = await auth.createUserWithEmailAndPassword(email, password);
        return userCredential.user;
    } catch (error) {
        console.error("Error signing up: ", error);
        return null;
    }
};
