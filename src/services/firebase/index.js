// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, signOut } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { IS_AUTHENTICATED, USER_STORAGE_KEY } from '../../Context/userAuth.context';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTHDOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECTID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_FIREBASE_APPID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENTID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const logout = () => {
  localStorage.removeItem(IS_AUTHENTICATED);
  localStorage.removeItem(USER_STORAGE_KEY);
  signOut(auth);
};

export { db, auth, logout, app };
