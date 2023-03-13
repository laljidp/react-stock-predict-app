import styled from '@emotion/styled';
import { Avatar, Divider, Typography } from '@mui/material';
import Box from '@mui/system/Box';
import propTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import deepOrange from '@mui/material/colors/deepOrange';
import { green } from '@mui/material/colors';
import { fetchCompletedPrediction } from '../../services/firebase/prediction.firebase';
import LoadingProgress from '../UI/LoadingProgress';
import NoDataFound from '../UI/NotDataFound';

function CompletedPredictions({ userID }) {
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(false);

  const requestCompletedPrediction = async () => {
    setLoading(true);
    const response = await fetchCompletedPrediction(userID);
    if (response.success) {
      setPredictions(response.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    requestCompletedPrediction();
    // fetch data from store
  }, [userID]);

  if (loading) {
    return <LoadingProgress />;
  }

  return (
    <Box>
      {predictions.map(({ stock, target, id }) => (
        <React.Fragment key={id}>
          <CompletedCard>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'center',
                width: '30%',
                '.danger': {
                  color: deepOrange[400],
                },
                '.green': {
                  color: green[400],
                },
              }}
            >
              <Box>
                <Avatar
                  sx={{ bgcolor: deepOrange[400] }}
                  alt={stock.symbol}
                  variant="rounded"
                  src="broken-iamge.jpeg"
                />
              </Box>

              <Box className="card-content">
                <Typography>
                  {stock.description} ({stock.symbol})
                </Typography>
                <Typography variant="small">
                  buy from ${stock.price.c} to ${target}
                </Typography>
              </Box>
            </Box>
            <Typography variant="h6" className="danger">
              50%
            </Typography>
          </CompletedCard>
          <Divider sx={{ width: '35%' }} />
        </React.Fragment>
      ))}
      {!loading && predictions.length === 0 && (
        <Box sx={{ marginTop: '18px' }}>
          <NoDataFound message="No completed predictions found!" />
        </Box>
      )}
    </Box>
  );
}

const CompletedCard = styled(Box)({
  padding: '10px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  fontWeight: 500,
  '.card-content': {
    display: 'block',
    lineHeight: 1,
    marginLeft: '15px',
  },
});

CompletedPredictions.propTypes = {
  userID: propTypes.string.isRequired,
};

export default CompletedPredictions;
