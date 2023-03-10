import React, { createContext, useContext, useState } from 'react';
import propTypes from 'prop-types';

// export type AlertColor = 'success' | 'info' | 'warning' | 'error'

// export interface SnackbarI {
//   show: boolean
//   type: AlertColor | undefined
//   message: string
// }

const SnackBarContext = createContext({
  snackbar: {
    show: false,
    type: 'error',
    message: '',
  },
  hideSnackbar: () => {},
  showError: () => {},
  showSuccessMsg: () => {},
});

function useProvideSnackbar() {
  const [snackbar, setSnackbar] = useState({
    show: false,
    type: 'error',
    message: '',
  });

  const hideSnackbar = () => {
    setSnackbar({
      show: false,
      type: undefined,
      message: '',
    });
  };

  const showError = (message) => {
    setSnackbar({
      show: true,
      type: 'error',
      message,
    });
  };

  const showSuccessMsg = (message) => {
    setSnackbar({
      show: true,
      type: 'success',
      message,
    });
  };

  return {
    snackbar,
    hideSnackbar,
    showError,
    showSuccessMsg,
  };
}

export function SnackBarProvider({ children }) {
  const snackbar = useProvideSnackbar();
  return <SnackBarContext.Provider value={snackbar}>{children}</SnackBarContext.Provider>;
}

SnackBarProvider.propTypes = {
  children: propTypes.any.isRequired,
};

export const useSnackbar = () => useContext(SnackBarContext);
