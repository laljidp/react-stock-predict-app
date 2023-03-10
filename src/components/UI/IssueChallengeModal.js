/* eslint-disable no-unused-vars */
import * as React from 'react';
import propTypes from 'prop-types';
import moment from 'moment';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Slide from '@mui/material/Slide';
import styled from '@emotion/styled';
import Box from '@mui/system/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import { deepOrange, green } from '@mui/material/colors';
import { PredictGradientButton } from './Buttons';
import { useSnackbar } from '../../Hooks/useSnackbar';

const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

export default function IssueChallengeModal({ open, onClose, prediction = {} }) {
  const [targetPrice, setTargetPrice] = React.useState('');
  const { showError } = useSnackbar();

  const handleClose = () => {
    setTargetPrice('');
    onClose();
  };

  const handleSubmitChallenge = () => {
    const stockPrice = Number(prediction?.stock.price.c);
    const isForwardPrediction = prediction?.target > stockPrice;
    const challengeTarget = Number(targetPrice);
    if (isForwardPrediction && challengeTarget > stockPrice) {
      showError(`Invalid prediction, Target Price should be Less than $${stockPrice}`);
    } else if (!isForwardPrediction && challengeTarget < stockPrice) {
      showError(`Invalid prediction, Target Price should be Greter than $${stockPrice}`);
    } else {
      // Call API to save
      console.log('hello there');
      const newPaylaod = {
        ...prediction,
      };
    }
  };

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        sx={{
          '.MuiDialog-scrollPaper': {
            justifyContent: 'center',
            alignItems: 'flex-start',
            zIndex: 2,
          },
          '.MuiPaper-root': {
            minHeight: '50%',
            width: '450px',
          },
          '.MuiDialogContent-root': {
            padding: '0',
          },
        }}
      >
        <DialogContent>
          <TopSection>
            <Box sx={{ textAlign: 'center' }}>
              <Box sx={{ position: 'absolute', left: '70px' }}>
                <Avatar
                  src="borken-image.jpeg"
                  alt={prediction?.userName || 'N/A'}
                  sx={{ height: '70px', width: '70px' }}
                />
              </Box>
              <Typography
                sx={{
                  color: 'yellow',
                  fontSize: '22px',
                  fontWeight: 600,
                  marginTop: '2rem',
                }}
              >
                {prediction?.userName || 'Predictany007'}
              </Typography>
              <Typography
                sx={{ letterSpacing: 7, color: '#fff', fontWeight: 600, marginTop: '12px' }}
              >
                Predicts
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Typography
                  sx={{ color: green[400], fontSize: '36px', textShadow: '4px 2px 6px green' }}
                >
                  <b>BUY</b>
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar
                    variant="rounded"
                    src="broken-image.jpeg"
                    alt="TSLA"
                    sx={{
                      width: '35px',
                      height: '35px',
                      bgcolor: deepOrange[400],
                      marginLeft: '10px',
                    }}
                  />
                  <Typography
                    color="#fff"
                    sx={{
                      display: 'grid',
                      lineHeight: 1,
                      marginLeft: '10px',
                      small: { fontSize: '10px' },
                    }}
                  >
                    <Typography variant="subtitle1">{prediction?.stock?.symbol}</Typography>
                    <small>{prediction?.stock?.description}</small>
                  </Typography>
                </Box>
              </Box>
              <Typography sx={{ color: 'rgb(218 218 218)', fontSize: '14px' }}>
                Predicted: {moment(prediction?.predictionDateTime).format('LL')}
              </Typography>
              <FlexBox>
                <span>Target Price: </span>
                <span>$ {prediction?.target}</span>
              </FlexBox>
              <FlexBox>
                <span>Target Date: </span>
                <span>{prediction?.predictionDateTime}</span>
              </FlexBox>
            </Box>
          </TopSection>
          <BottomSection>
            <Typography variant="subtitle2">
              To challenge, you must predict the opposite of the above user`s prediction
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Typography variant="subtitle1">
                <strong>Tesla will reach a target of:</strong>
              </Typography>
              <TextField
                sx={{ maxWidth: '120px', marginLeft: '18px' }}
                placeholder="Price $"
                name="targetPrice"
                size="small"
                type="number"
                value={targetPrice}
                onChange={({ target }) => setTargetPrice(target.value)}
              />
            </Box>
            <Box sx={{ textAlign: 'center', marginTop: '18px' }}>
              <PredictGradientButton onClick={handleSubmitChallenge}>
                Issue challenge
              </PredictGradientButton>
            </Box>
          </BottomSection>
        </DialogContent>
      </Dialog>
    </div>
  );
}

const TopSection = styled(Box)({
  padding: '1rem',
  position: 'relative',
  background: 'radial-gradient(circle, rgba(65,70,65,1) 1%, rgba(0,0,0,0.9780505952380952) 53%)',
});

const BottomSection = styled(Box)({
  backgroundColor: '#f6fafc',
  padding: '1rem',
  textAlign: 'center',
  background:
    'linear-gradient(50deg, rgba(206,230,243,1) 0%,' +
    'rgba(255,255,255,1) 41%, rgba(206,230,243,1) 68%)',
});

const FlexBox = styled(Box)({
  color: '#fff',
  fontSize: '14px',
  fontWeight: 500,
  display: 'flex',
  justifyContent: 'space-between',
  width: '170px',
  margin: '0 auto',
  lineHeight: 2,
});

IssueChallengeModal.propTypes = {
  open: propTypes.bool.isRequired,
  onClose: propTypes.func.isRequired,
  prediction: propTypes.object,
};

IssueChallengeModal.defaultProps = {
  prediction: null,
};
