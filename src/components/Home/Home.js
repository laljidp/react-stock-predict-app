/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react';
import Container from '@mui/system/Container';
import { AuthContext } from '../../Context/userAuth.context';
import { fetchUsersFromStore } from '../../services/firebase/users.firebase';
import UsersList from '../UI/UsersList';
import PredictionLists from '../UI/PredictionList';
import { fetchUserPredictions } from '../../services/firebase/prediction.firebase';

function Home() {
  const {
    userData: { uid: currentUserID },
  } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [predictions, setPredictions] = useState([
    {
      percentage: 10,
      selectedDurationType: 'week',
      target: 120,
      userId: 'VaI72dkHQ2SKuLPBYU81OHZDSGJ2',
      id: 'mUoLqqHtSEyvBrPeWBQ9',
      challanges: [],
      stock: {
        type: 'Common Stock',
        price: {
          o: 96.55,
          l: 98.095,
          t: 1678117708,
          pc: 98.33,
          c: 99.04,
          h: 99.2,
          dp: 0.7221,
          d: 0.71,
        },
        displaySymbol: 'MS',
        symbol: 'MS',
        description: 'MORGAN STANLEY',
      },
      predictionDateTime: {
        seconds: 1678645800,
        nanoseconds: 0,
      },
      afterPercentageTarget: 89.163,
      isSharePublicaly: true,
    },
  ]);

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
      <h4>Other users</h4>
      <UsersList users={users} onSelectUser={handleSelectUser} />
      <h5>Your ongoing prediction</h5>
      <PredictionLists predictions={predictions} />
    </Container>
  );
}

export default Home;
