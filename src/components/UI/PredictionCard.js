import styled from '@emotion/styled';
import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/system/Box';
import Chip from '@mui/material/Chip';
import predictionCardImage from '../../assets/images/prediction-card.jpeg';
import TimeRemaining from './TimeRemaining';
import PredictionLiveWidget from './PredictionLiveWidget';
import { calculateDaysLeft } from '../../Utils';
import { ChallengeButton } from './Buttons';

export default function PredictionCard({ prediction, isChallengeCard, onChallengeClick }) {
  const { target, stock, predictionDateTime, afterPercentageTarget, userName } = prediction;
  return (
    <Box>
      <PredictionCardSection>
        <UserInfoSection>
          <div className="user-info">
            <Avatar sx={{ marginLeft: '10px' }} src="./broken-image.jpeg" />
            <span className="p-name">{userName || 'Predictany007'}</span>
            {prediction?.challenge?.userName && (
              <Chip
                sx={{ marginLeft: '10px', textAlign: 'right' }}
                label="C"
                color="primary"
                size="small"
              />
            )}
          </div>
        </UserInfoSection>
        <StockInfoSection>
          <div className="head">
            <div className="head-left">
              <Avatar color="yellow" alt="BTC" />
              <span className="stock-symbol">{stock.symbol}</span>
            </div>
            <div className="head-right">
              <div className="content">
                <strong>Target Price:</strong> <strong className="green">${target}</strong>
              </div>
              <div className="content">
                <strong>Target date:</strong>{' '}
                <strong className="green">{predictionDateTime}</strong>
              </div>
              <div className="content">
                <strong>Stop-loss:</strong>
                <strong className="danger">${afterPercentageTarget}</strong>
              </div>
            </div>
          </div>
          <hr />
          <TimeRemaining daysLeft={calculateDaysLeft(predictionDateTime)} />
          <PredictionLiveWidget
            targetPrice={Number(target)}
            predictionPrice={stock.price.c}
            stopLoss={Number(afterPercentageTarget)}
            livePrice={100}
          />
        </StockInfoSection>
      </PredictionCardSection>
      {isChallengeCard && (
        <Box sx={{ textAlign: 'center', padding: '5px 0' }}>
          <ChallengeButton
            onClick={() => onChallengeClick(prediction)}
            color="primary"
            variant="contained"
          >
            Challenge
          </ChallengeButton>
        </Box>
      )}
    </Box>
  );
}

const PredictionCardSection = styled('div')({
  backgroundColor: 'grey',
  borderRadius: '4px',
  backgroundImage: `url(${predictionCardImage})`,
  objectFit: 'cover',
  height: '220px',
  minWidth: '380px',
  backgroundSize: 'cover',
  padding: '6px 0',
});

const UserInfoSection = styled('div')({
  width: '70%',
  boxShadow: '4px -2px 2px 4px #263a47',
  height: '35px',
  background: 'black',
  color: '#ffd230',
  fontWeight: 'bold',
  padding: '5px',
  borderRadius: '10px',
  opacity: '.9',
  '.user-info': {
    display: 'inline-flex',
    alignItems: 'center',
    '.p-name': {
      marginLeft: '10px',
      fontSize: '20px',
    },
  },
});

const StockInfoSection = styled('div')({
  width: '70%',
  padding: '10px',
  borderRadius: '4px',
  boxShadow: '4px -2px 2px 4px #263a47',
  height: 'calc(100% - 70px)',
  background: 'black',
  marginTop: '10px',
  opacity: '.9',
  '.head': {
    height: '40px',
    display: 'inline-flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    '.head-left': {
      color: '#fff',
      display: 'inline-flex',
      alignItems: 'center',
      '.stock-symbol': {
        fontSize: '25px',
        marginLeft: '10px',
      },
    },
    '.head-right': {
      color: '#fff',
      fontSize: '11px',
      width: '50%',
      display: 'grid',
      gridGap: '2px',
      '.content': {
        display: 'inline-flex',
        justifyContent: 'space-between',
        alignContent: 'center',
      },
      'strong.green': {
        color: 'green',
      },
      'strong.danger': {
        color: 'red',
      },
    },
  },
});

PredictionCard.propTypes = {
  prediction: PropTypes.any.isRequired,
  isChallengeCard: PropTypes.bool,
  onChallengeClick: PropTypes.func,
};

PredictionCard.defaultProps = {
  isChallengeCard: true,
  onChallengeClick: () => {},
};
