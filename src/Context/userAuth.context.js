import React, { createContext, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

const initialState = {
  isAuthenticated: false,
  userData: null,
};

export const USER_STORAGE_KEY = 'User';
export const IS_AUTHENTICATED = 'IsAuthenticated';

export const AuthContext = createContext(initialState);

function AuthContextProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem(IS_AUTHENTICATED) || false,
  );
  const [userData, setUserData] = useState(JSON.parse(localStorage.getItem('User') || 'null'));

  const toggleAuth = () => setIsAuthenticated(!isAuthenticated);

  const values = useMemo(
    () => ({ isAuthenticated, setIsAuthenticated, toggleAuth, userData, setUserData }),
    [isAuthenticated, toggleAuth, userData, setUserData, setIsAuthenticated],
  );

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
}

AuthContextProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default AuthContextProvider;
