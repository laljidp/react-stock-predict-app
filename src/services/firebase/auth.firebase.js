import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '.';

export const signInWithFirebase = async (email, password) => {
  try {
    const userCredentials = await signInWithEmailAndPassword(auth, email, password);
    return { success: true, message: 'Login succeeded', user: userCredentials.user };
  } catch (err) {
    console.log('err', err);
    return { success: false, message: 'Invalid credentials!' };
  }
};
