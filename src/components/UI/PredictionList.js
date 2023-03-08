import styled from '@emotion/styled';
import React from 'react';
import PropTypes from 'prop-types';
import PredictionCard from './PredictionCard';

export default function PredictionLists({ predictions }) {
  return (
    <PredictionSection>
      {predictions.map((prediction) => (
        <PredictionCard prediction={prediction} key={prediction.id} />
      ))}
    </PredictionSection>
  );
}

PredictionLists.propTypes = {
  predictions: PropTypes.array,
};

PredictionLists.defaultProps = {
  predictions: [],
};

const PredictionSection = styled('div')({
  padding: '5px',
});
