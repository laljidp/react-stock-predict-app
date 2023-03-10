import Button from '@mui/material/Button';
import styled from '@emotion/styled';

export const PredictGradientButton = styled(Button)({
  padding: '10px 18px',
  backgroundColor: 'rgb(34 255 34)',
  borderRadius: '30px',
  background: 'radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(34,254,34,1) 54%)',
  color: 'black',
  fontWeight: 'bold',
  textTransform: 'capitalize',
  '[disabled=true]': {
    backgroundColor: '#dedede',
  },
});

export const PredictButton = styled(Button)({
  background: '#FF6A6A',
  borderRadius: '40px',
  color: '#fff',
  fontWeight: 600,
  '.Mui-disabled': {
    backgroundColor: '#dedede',
  },
});

export const ChallengeButton = styled(Button)({
  borderRadius: '20px',
  backgroundColor: '#6aff79',
  textTransform: 'capitalize',
  padding: '5px 20px',
  fontWeight: 600,
});
