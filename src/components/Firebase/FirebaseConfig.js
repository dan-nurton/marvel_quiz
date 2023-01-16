import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc } from 'firebase/firestore';

const config = {
  apiKey: 'AIzaSyAu5Zrbp6yPByNVq0iWsJLCTTHDH-XmnOg',
  authDomain: 'marvelquiz-69f60.firebaseapp.com',
  projectId: 'marvelquiz-69f60',
  storageBucket: 'marvelquiz-69f60.appspot.com',
  messagingSenderId: '807776084481',
  appId: '1:807776084481:web:9780b208ca98683701d600',
};

const app = initializeApp(config);

export const auth = getAuth(app);
export const firestore = getFirestore();
export const user = (uid) => doc(firestore, `users/${uid}`);
