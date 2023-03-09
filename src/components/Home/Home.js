/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react';
import Container from '@mui/system/Container';
import styled from '@emotion/styled';
import { Button } from '@mui/material';
import { AuthContext } from '../../Context/userAuth.context';
import { fetchUsersFromStore } from '../../services/firebase/users.firebase';
import UsersList from '../UI/UsersList';
import PredictionLists from '../UI/PredictionList';
import { fetchUserPredictions } from '../../services/firebase/prediction.firebase';
import PredictButton from '../UI/PredictButton';
import CreatePredictionModal from '../UI/CreatePredictionModal';

function Home() {
  const {
    userData: { uid: currentUserID, name },
  } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [predictions, setPredictions] = useState([]);

  const fetchUsers = async () => {
    console.log('calling APIs');
    const result = await fetchUsersFromStore(currentUserID);
    setUsers(result);
  };

  const fetchPredictions = async () => {
    const result = await fetchUserPredictions(currentUserID);
    setPredictions(result);
  };

  const handleSelectUser = (userID) => {
    console.log('Selected User:', userID);
  };

  useEffect(() => {
    fetchUsers();
    fetchPredictions();
  }, []);

  return (
    <Container>
      <HeadSection>
        <div className="heading-text">YOUR ACCOUNT</div>
        <div>
          <PredictButton>Predict Now</PredictButton>
        </div>
      </HeadSection>
      <h3>Other users</h3>
      <UsersList users={users} onSelectUser={handleSelectUser} />
      <h3>Your ongoing prediction</h3>
      <PredictionLists predictions={predictions} />
      <CreatePredictionModal open onClose={() => {}} />
    </Container>
  );
}

const HeadSection = styled('div')({
  display: 'flex',
  alignItems: 'flex-end',
  justifyContent: 'space-between',
  width: '100%',
  margin: '20px 0',
  '.heading-text': {
    fontWeight: 'bold',
    fontSize: '28px',
  },
});

export default Home;
