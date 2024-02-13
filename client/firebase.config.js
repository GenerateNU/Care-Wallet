// Import the functions you need from the SDKs you need
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from 'firebase/app';
import { getReactNativePersistence, initializeAuth } from 'firebase/auth';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyA8Ox_r-nkPjzvmrqI4uDrBVHuKDUsOKfU',
  authDomain: 'care-wallet-generate.firebaseapp.com',
  projectId: 'care-wallet-generate',
  storageBucket: 'care-wallet-generate.appspot.com',
  messagingSenderId: '567693879422',
  appId: '1:567693879422:web:97b722f9c4eb38e484d02f',
  measurementId: 'G-NW8HWJ14V4'
};

const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
