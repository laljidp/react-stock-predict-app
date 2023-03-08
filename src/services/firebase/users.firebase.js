import { getDocs, collection, where, query } from 'firebase/firestore';
import { db } from '.';

export const USERS_COLLECTION = 'Users';

export const fetchUsersFromStore = async (currentUserID) => {
  try {
    const userQuery = query(collection(db, USERS_COLLECTION), where('id', '!=', currentUserID));
    const querySnapshot = await getDocs(userQuery);
    // eslint-disable-next-line no-debugger
    const data = [];
    querySnapshot.forEach((doc) => data.push(doc.data()));
    console.log('data', data);
    return data;
  } catch (err) {
    console.log('err', err);
    return [];
  }
};
