import { getDocs, collection, where, query, addDoc, updateDoc, orderBy } from 'firebase/firestore';
import predictionConverter from '../firebaseConverters/predictionConverter';
import { db } from '.';

export const PREDICTION_COLLECTION = 'public_predictions';

export const fetchUserPredictions = async (userID) => {
  try {
    const predictionQuery = query(
      collection(db, PREDICTION_COLLECTION).withConverter(predictionConverter),
      where('userId', '==', userID),
      where(
        'predictionDateTime',
        '>=',
        new Date(Date.now() + 1000),
        orderBy('predictionDateTime', 'desc'),
      ),
    );
    const querySnapshot = await getDocs(predictionQuery);
    // eslint-disable-next-line no-debugger
    const data = [];
    querySnapshot.forEach((doc) => data.push(doc.data().getFormattedData()));
    return data;
  } catch (err) {
    console.log('err', err);
    return [];
  }
};

export const createPrediction = async (prediction) => {
  try {
    const docRef = await addDoc(collection(db, PREDICTION_COLLECTION), prediction);
    await updateDoc(docRef, { id: docRef.id });
    if (docRef.id) {
      return { success: true, message: 'Prediction added!' };
    }
    return { success: false, message: 'Prediction failed to saved' };
  } catch (err) {
    console.log('err', err);
    return { success: false, message: 'Something went wrong!' };
  }
};

export const fetchPublicPredictions = async (userID) => {
  try {
    const predictionQuery = query(
      collection(db, PREDICTION_COLLECTION).withConverter(predictionConverter),
      where('userId', '==', userID),
      where('predictionDateTime', '>=', new Date(Date.now() + 1000)),
      where('isSharePublicaly', '==', true),
      orderBy('predictionDateTime', 'desc'),
    );
    const querySnapshot = await getDocs(predictionQuery);
    // eslint-disable-next-line no-debugger
    const data = [];
    querySnapshot.forEach((doc) => data.push(doc.data().getFormattedData()));
    return data;
  } catch (err) {
    console.log('err', err);
    return [];
  }
};

export const fetchCompletedPrediction = async (userID) => {
  try {
    const completedPredictionQuery = query(
      collection(db, PREDICTION_COLLECTION).withConverter(predictionConverter),
      where('userId', '==', userID),
      where('predictionDateTime', '<', new Date(Date.now() + 1000)),
    );
    const querySnapshot = await getDocs(completedPredictionQuery);
    const data = [];
    querySnapshot.forEach((doc) => data.push(doc.data().getFormattedData()));
    return { success: true, data };
  } catch (err) {
    console.log('Error while fetching completed predictins', err);
    return { success: false, message: 'Reuest failed to for complete preidiction data' };
  }
};
