import React from 'react';
import propTypes from 'prop-types';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/system/Box';

export default function LoadingProgress({ color }) {
  return (
    <Box sx={{ textAlign: 'center', margin: '3rem 0' }}>
      <CircularProgress color={color} />;
    </Box>
  );
}

LoadingProgress.propTypes = {
  color: propTypes.oneOf([
    'primary',
    'secondary',
    'error',
    'info',
    'success',
    'warning',
    'inherit',
  ]),
};

LoadingProgress.defaultProps = {
  color: 'secondary',
};
