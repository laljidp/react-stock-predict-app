import styled from '@emotion/styled';
import React from 'react';
import PropTypes from 'prop-types';
import { Avatar } from '@mui/material';
import predictionCardImage from '../../assets/images/prediction-card.jpeg';
import TimeRemaining from './TimeRemaining';
import PredictionLiveWidget from './PredictionLiveWidget';

export default function PredictionCard({ prediction }) {
  const { target, stock, predictionDateTime, afterPercentageTarget } = prediction;
  return (
    <PredictionCardSection>
      <UserInfoSection>
        <div className="user-info">
          <Avatar sx={{ marginLeft: '10px' }} src="./broken-image.jpeg" />
          <span className="p-name">Predictany007</span>
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
              <strong>Target date:</strong> <strong className="green">{predictionDateTime}</strong>
            </div>
            <div className="content">
              <strong>Stop-loss:</strong>
              <strong className="danger">${afterPercentageTarget}</strong>
            </div>
          </div>
        </div>
        <hr />
        <TimeRemaining daysLeft={1} />
        <PredictionLiveWidget
          targetPrice={target}
          predictionPrice={stock.price.c}
          stopLoss={afterPercentageTarget}
          livePrice={100}
        />
      </StockInfoSection>
    </PredictionCardSection>
  );
}

const PredictionCardSection = styled('div')({
  backgroundColor: 'grey',
  borderRadius: '4px',
  backgroundImage: `url(${predictionCardImage})`,
  objectFit: 'cover',
  height: '220px',
  width: '380px',
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
};
