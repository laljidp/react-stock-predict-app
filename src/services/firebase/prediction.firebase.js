import { getDocs, collection, where, query } from 'firebase/firestore';
import predictionConverter from '../firebaseConverters/prediction.converter';
import { db } from '.';

export const PREDICTION_COLLECTION = 'public_predictions';

export const fetchUserPredictions = async (userID) => {
  try {
    const predictionQuery = query(
      collection(db, PREDICTION_COLLECTION).withConverter(predictionConverter),
      where('userId', '==', userID),
    );
    const querySnapshot = await getDocs(predictionQuery);
    // eslint-disable-next-line no-debugger
    const data = [];
    querySnapshot.forEach((doc) => data.push(doc.data().getFormattedData()));
    console.log('data', data);
    return data;
  } catch (err) {
    console.log('err', err);
    return [];
  }
};
