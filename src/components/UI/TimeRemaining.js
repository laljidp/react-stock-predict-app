import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

export default function TimeRemaining({ daysLeft = 0 }) {
  return (
    <TimeRemainingSection>
      <small>Time Remaining</small>
      <div className="time-section">
        <span className="round">{daysLeft}</span>
        <div className="day-left-text">
          <span className="day">Day</span>
          <span className="left">Left</span>
        </div>
      </div>
    </TimeRemainingSection>
  );
}

const TimeRemainingSection = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  small: {
    color: '#fff',
    fontSize: '12px',
  },
  '.time-section': {
    position: 'relative',
  },
  '.round': {
    borderRadius: '50%',
    padding: '8px',
    width: '15px',
    fontSize: '15px',
    height: '13px',
    background: 'green',
    marginLeft: '10px',
    color: '#fff',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    border: '3px solid black',
  },
  '.day-left-text': {
    display: 'inline-grid',
    color: '#fff',
    fontSize: '10px',
    width: '25px',
    position: 'absolute',
    left: '40px',
    zIndex: '-1',
    top: '5px',
    fontWeight: 'bold',
    '.day': {
      backgroundColor: 'red',
      padding: '0 10px',
    },
    '.left': {
      backgroundColor: 'green',
      padding: '0 10px',
    },
  },
});

TimeRemaining.propTypes = {
  daysLeft: PropTypes.number.isRequired,
};
