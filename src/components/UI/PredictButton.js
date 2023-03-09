import React from 'react';
import Button from '@mui/material/Button';
import propTypes from 'prop-types';
import styled from '@emotion/styled';

function PredictButton({ children, className }) {
  return (
    <PredictBtn variant="primary" className={className}>
      {children}
    </PredictBtn>
  );
}

const PredictBtn = styled(Button)({
  background: '#FF6A6A',
  borderRadius: '40px',
  color: '#fff',
  fontWeight: 600,
  '&:hover': {
    backgroundColor: '#ea2b2b',
  },
});

PredictButton.propTypes = {
  children: propTypes.any.isRequired,
  className: propTypes.string,
};

PredictButton.defaultProps = {
  className: '',
};

export default PredictButton;
