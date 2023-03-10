import propTypes from 'prop-types';
import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/system/Box';

export default function NoDataFound({ message }) {
  return (
    <Box
      sx={{
        border: '1px solid #dedede',
        borderRadius: '10px',
        textAlign: 'center',
        padding: '1rem',
      }}
    >
      <Typography>&#9432; {message}</Typography>
    </Box>
  );
}

NoDataFound.propTypes = {
  message: propTypes.string.isRequired,
};
