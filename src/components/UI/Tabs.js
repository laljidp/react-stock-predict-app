import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import styled from '@emotion/styled';
import { Button, ButtonGroup } from '@mui/material';

function CustomTabs({ handleChange, value, tabs, sx }) {
  const [currentTab, setCurrentTab] = useState(null);
  const handleTabChange = (tab) => {
    setCurrentTab(tab);
    handleChange(tab);
  };

  useEffect(() => {
    setCurrentTab(value);
  }, [value]);

  return (
    <ButtonTabs sx={sx} color="primary" size="small" aria-label="small button group">
      {tabs.map((tab) => (
        <Button
          color="secondary"
          variant="outlined"
          key={tab.value}
          onClick={() => handleTabChange(tab.value)}
          className={currentTab === tab.value ? 'selected' : ''}
        >
          {tab.label}
        </Button>
      ))}
    </ButtonTabs>
  );
}

const ButtonTabs = styled(ButtonGroup)({
  backgroundColor: '#fff',
  borderColor: 'black',
  button: {
    color: 'black',
    border: '1px solid #857b7b !important',
    padding: '3px 20px',
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  'button.selected': {
    backgroundColor: 'rgb(0 255 0)',
  },
});

CustomTabs.propTypes = {
  handleChange: propTypes.func.isRequired,
  value: propTypes.string.isRequired,
  tabs: propTypes.array,
  sx: propTypes.any,
};

CustomTabs.defaultProps = {
  tabs: [],
  sx: {},
};

export default CustomTabs;
