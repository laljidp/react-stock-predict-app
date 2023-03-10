import { collection, orderBy, query, where } from 'firebase/firestore';
import { db } from '.';
import predictionConverter from '../firebaseConverters/predictionConverter';
import { PREDICTION_COLLECTION } from './prediction.firebase';

export const getUserPublicPredictionQuery = (userID) =>
  query(
    collection(db, PREDICTION_COLLECTION).withConverter(predictionConverter),
    where('userId', '==', userID),
    where(
      'predictionDateTime',
      '>=',
      new Date(Date.now() + 1000),
      orderBy('predictionDateTime', 'desc'),
    ),
  );

export const getPublicPredictionQuery = (userID) =>
  query(
    collection(db, PREDICTION_COLLECTION).withConverter(predictionConverter),
    where('userId', '==', userID),
    where('predictionDateTime', '>=', new Date(Date.now() + 1000)),
    where('isSharePublicaly', '==', true),
    orderBy('predictionDateTime', 'desc'),
  );

export const getCompletedPredictionQuery = (userID) =>
  query(
    collection(db, PREDICTION_COLLECTION).withConverter(predictionConverter),
    where('userId', '==', userID),
    where('predictionDateTime', '<', new Date(Date.now() + 1000)),
  );
