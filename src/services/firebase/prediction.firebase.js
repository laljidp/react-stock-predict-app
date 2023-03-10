import { getDocs, collection, addDoc, updateDoc } from 'firebase/firestore';
import { db } from '.';
import predictionConverter from '../firebaseConverters/predictionConverter';
import {
  getCompletedPredictionQuery,
  getPublicPredictionQuery,
  getUserPublicPredictionQuery,
} from './queries';

export const PREDICTION_COLLECTION = 'public_predictions';

export const fetchUserPredictions = async (userID) => {
  try {
    const querySnapshot = await getDocs(getUserPublicPredictionQuery(userID));
    const data = [];
    querySnapshot.forEach((doc) => data.push(doc.data().getFormattedData()));
    return { success: true, data };
  } catch (err) {
    console.log('err', err);
    return { success: false, data: [] };
  }
};

export const createPrediction = async (prediction) => {
  try {
    const docRef = await addDoc(
      collection(db, PREDICTION_COLLECTION).withConverter(predictionConverter),
      prediction,
    );
    await updateDoc(docRef, { id: docRef.id });
    console.log('Prediction created ==> ', docRef.id);
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
    const querySnapshot = await getDocs(getPublicPredictionQuery(userID));
    // eslint-disable-next-line no-debugger
    const data = [];
    querySnapshot.forEach((doc) => data.push(doc.data().getFormattedData()));
    return { success: true, data };
  } catch (err) {
    console.log('err', err);
    return { success: false, data: [] };
  }
};

export const fetchCompletedPrediction = async (userID) => {
  try {
    const querySnapshot = await getDocs(getCompletedPredictionQuery(userID));
    const data = [];
    querySnapshot.forEach((doc) => data.push(doc.data().getFormattedData()));
    return { success: true, data };
  } catch (err) {
    console.log('Error while fetching completed predictins', err);
    return { success: false, message: 'Reuest failed to for complete preidiction data' };
  }
};
