import { auth } from '../../firebase.config';
import { onAuthStateChanged as firebaseOnAuthStateChanged, User } from "firebase/auth";


export const onAuthStateChanged = (callback: (user: User | null) => void): void => {
    firebaseOnAuthStateChanged(auth, (user: User | null) => {
      callback(user);
    });
};
