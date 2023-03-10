import React, { useState } from 'react';
import propTypes from 'prop-types';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import Box from '@mui/system/Box';
import PredictionLists from './PredictionList';
import CompletedPredictions from './CompletedPredictions';
import IssueChallengeModal from './IssueChallengeModal';

const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

export default function SwitchUserModal({ open, onClose, userID, userName }) {
  const [challengeModal, setChallengeModal] = useState({
    open: false,
    prediction: null,
  });

  console.log('userUID', userID);
  const handleClose = () => {
    onClose();
  };

  const closeChallengeModal = () => {
    setChallengeModal({
      open: false,
      prediction: null,
    });
  };

  const handleChallengeClick = (prediction) => {
    setChallengeModal({
      open: true,
      prediction,
    });
  };

  return (
    <div>
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar sx={{ position: 'relative' }} color="default">
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              {userName}`s Predictions
            </Typography>
          </Toolbar>
        </AppBar>
        <Box sx={{ padding: '10px' }}>
          <Typography variant="subtitle2" sx={{ marginTop: '18px', fontWeight: 600 }}>
            ONGOING PREDICTION
          </Typography>
          <Box sx={{ marginTop: '18px' }}>
            <PredictionLists
              userID={userID}
              isChallengesList
              onChallengeClick={handleChallengeClick}
            />
          </Box>
          <Typography variant="subtitle2" sx={{ marginTop: '18px', fontWeight: 600 }}>
            COMPLETED PREDICTIONS
          </Typography>
          <CompletedPredictions userID={userID} />
        </Box>
        <IssueChallengeModal
          open={challengeModal.open}
          prediction={challengeModal.prediction}
          onClose={closeChallengeModal}
        />
      </Dialog>
    </div>
  );
}

SwitchUserModal.propTypes = {
  open: propTypes.bool.isRequired,
  onClose: propTypes.func.isRequired,
  userID: propTypes.string.isRequired,
  userName: propTypes.string.isRequired,
};
