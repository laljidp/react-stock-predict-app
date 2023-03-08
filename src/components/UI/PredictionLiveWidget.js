import styled from '@emotion/styled';
import propTypes from 'prop-types';
import React from 'react';

export default function PredictionLiveWidget(props) {
  const { stopLoss, predictionPrice, targetPrice, livePrice } = props;
  console.log(livePrice);
  return (
    <WidgetSection>
      <div className="round-grey stop-loss-section">
        <span>${stopLoss}</span>
      </div>
      <StockPriceBar />
      <div className="round-grey prediction-section">
        <span>${predictionPrice}</span>
      </div>
      <StockPriceBar />
      <div className="round-grey target-price-section">
        <span>${targetPrice}</span>
      </div>
      {/* <span className="livePrice">{livePrice}</span> */}
    </WidgetSection>
  );
}

const WidgetSection = styled('div')({
  display: 'inline-flex',
  color: '#fff',
  marginTop: '10px',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  '.round-grey': {
    height: '40px',
    width: '40px',
    fontSize: '10px',
    borderRadius: '50%',
    backgroundColor: '#494f56',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '500',
  },
});

const StockPriceBar = styled('div')({
  width: '30%',
  height: '12px',
  alignContent: 'center',
  backgroundColor: '#494f56',
  marginRight: '-2px',
  marginLeft: '-2px',
});

PredictionLiveWidget.propTypes = {
  stopLoss: propTypes.number.isRequired,
  predictionPrice: propTypes.number.isRequired,
  targetPrice: propTypes.number.isRequired,
  livePrice: propTypes.number.isRequired,
};
