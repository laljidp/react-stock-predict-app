import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { onSnapshot } from 'firebase/firestore';
import PredictionCard from './PredictionCard';
import LoadingProgress from './LoadingProgress';
import NoDataFound from './NotDataFound';
import {
  fetchPublicPredictions,
  fetchUserPredictions,
} from '../../services/firebase/prediction.firebase';
import {
  getPublicPredictionQuery,
  getUserPublicPredictionQuery,
} from '../../services/firebase/queries';

export default function PredictionLists({ userID, isChallengesList, onChallengeClick }) {
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchPredictions = async () => {
    setLoading(true);
    const result = await fetchUserPredictions(userID);
    setPredictions(result.data);
    setLoading(false);
  };

  const getPublicPredictions = async () => {
    setLoading(true);
    const result = await fetchPublicPredictions(userID);
    setPredictions(result.data);
    setLoading(false);
  };

  useEffect(() => {
    let unsubscribe;
    if (isChallengesList) {
      getPublicPredictions();
      unsubscribe = onSnapshot(getPublicPredictionQuery(userID), (querySnapshot) => {
        const data = [];
        querySnapshot.forEach((snapshot) => data.push(snapshot.data().getFormattedData()));
        setPredictions(data);
      });
    } else {
      fetchPredictions();
      unsubscribe = onSnapshot(getUserPublicPredictionQuery(userID), (querySnapshot) => {
        const data = [];
        querySnapshot.forEach((snapshot) => data.push(snapshot.data().getFormattedData()));
        setPredictions(data);
      });
    }

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  if (loading) {
    return <LoadingProgress />;
  }

  return (
    <PredictionSection>
      <OverFlowSection>
        {predictions.map((prediction) => (
          <PredictionCard
            key={prediction.id}
            onChallengeClick={onChallengeClick}
            prediction={prediction}
            isChallengeCard={isChallengesList}
          />
        ))}
        {!loading && predictions.length === 0 && (
          <NoDataFound message="No ongoing prediction found" />
        )}
      </OverFlowSection>
    </PredictionSection>
  );
}

PredictionLists.propTypes = {
  userID: PropTypes.string.isRequired,
  isChallengesList: PropTypes.bool,
  onChallengeClick: PropTypes.func,
};

PredictionLists.defaultProps = {
  isChallengesList: false,
  onChallengeClick: () => {},
};

const PredictionSection = styled('div')({
  padding: '5px',
  width: '100%',
});

const OverFlowSection = styled('div')({
  alignItems: 'flex-start',
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'nowrap',
  overflowX: 'auto',
  overflowY: 'hidden',
  gridGap: '18px',
  '::-webkit-scrollbar': {
    height: '10px',
    margin: '5px',
  },
  '::-webkit-scrollbar-track': {
    boxShadow: 'inset 0 0 1px rgba(0, 0, 0, 0.3)',
  },
  '::-webkit-scrollbar-thumb': {
    background: '#464d58',
    borderRadius: '10px',
  },
});
