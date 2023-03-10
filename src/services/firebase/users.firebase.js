import { getDocs, collection, where, query, getDoc, doc } from 'firebase/firestore';
import { db } from '.';

export const USERS_COLLECTION = 'Users';

export const fetchUsersFromStore = async (currentUserID) => {
  try {
    const userQuery = query(collection(db, USERS_COLLECTION), where('id', '!=', currentUserID));
    const querySnapshot = await getDocs(userQuery);
    // eslint-disable-next-line no-debugger
    const data = [];
    querySnapshot.forEach((snapshot) => data.push(snapshot.data()));
    return data;
  } catch (err) {
    console.log('err', err);
    return [];
  }
};

export const fetchUserinfoByID = async (userID) => {
  try {
    const userRef = doc(db, USERS_COLLECTION, userID);
    const snapshot = await getDoc(userRef);
    return { success: true, data: snapshot.data() };
  } catch (err) {
    return { success: false, message: 'No user found!' };
  }
};
