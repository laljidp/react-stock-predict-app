/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react';
import Container from '@mui/system/Container';
import Box from '@mui/system/Box';
import styled from '@emotion/styled';
import { Button, Typography } from '@mui/material';
import { AuthContext } from '../../Context/userAuth.context';
import { fetchUsersFromStore } from '../../services/firebase/users.firebase';
import UsersList from '../Prediction/UsersList';
import PredictionLists from '../Prediction/PredictionList';
import CreatePredictionModal from '../Prediction/CreatePredictionModal';
import CompletedPredictions from '../Prediction/CompletedPredictions';
import SwitchUserModal from '../Prediction/SwitchUserModal';
import { PredictButton } from '../UI/Buttons';
import LoadingProgress from '../UI/LoadingProgress';

function Home() {
  const {
    userData: { uid: currentUserID, name },
  } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [userLoading, setUserLoading] = useState(false);
  const [showPredictModal, setShowPredictModal] = useState(false);
  const [switchUser, setSwitchUser] = useState({
    open: false,
    userID: '',
    userName: '',
  });

  const closeSwitchModal = () =>
    setSwitchUser({
      open: false,
      userID: '',
      userName: '',
    });

  const fetchUsers = async () => {
    console.log('calling APIs');
    setUserLoading(true);
    const result = await fetchUsersFromStore(currentUserID);
    setUsers(result);
    setUserLoading(false);
  };

  const handleSelectUser = (user) => {
    setSwitchUser({
      open: true,
      userID: user.id,
      userName: user.name,
    });
  };

  const togglePredictModal = () => setShowPredictModal(!showPredictModal);

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <Container maxWidth="xl">
      <HeadSection>
        <Typography className="heading-text">Hello, {name}</Typography>
        <Box>
          <PredictButton onClick={togglePredictModal}>Predict Now</PredictButton>
        </Box>
      </HeadSection>
      <Typography variant="body2" sx={{ fontWeight: 600, paddingTop: '18px' }}>
        OTHER USERS
      </Typography>
      <Box sx={{ marginTop: '18px' }}>
        {userLoading ? (
          <LoadingProgress />
        ) : (
          <UsersList users={users} onSelectUser={handleSelectUser} />
        )}
      </Box>
      <Typography variant="body2" sx={{ fontWeight: 600, paddingTop: '18px' }}>
        YOUR ONGOING PREDICTION
      </Typography>
      <Box sx={{ marginTop: '18px' }}>
        <PredictionLists userID={currentUserID} />
      </Box>
      <Typography variant="body2" sx={{ fontWeight: 600, paddingTop: '18px' }}>
        YOUR COMPLETED PREDICTIONS
      </Typography>
      <Box sx={{ marginTop: '18px' }}>
        <CompletedPredictions userID={currentUserID} />
      </Box>
      <CreatePredictionModal open={showPredictModal} onClose={togglePredictModal} />
      <SwitchUserModal onClose={closeSwitchModal} {...switchUser} />
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
