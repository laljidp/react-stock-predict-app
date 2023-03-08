import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../../Context/userAuth.context';
import MenuAppBar from '../Appbar';

export default function PrivateRoutes() {
  const { userData, isAuthenticated } = useContext(AuthContext);

  return isAuthenticated && !!userData ? (
    <>
      <MenuAppBar />
      <Outlet />
    </>
  ) : (
    <Navigate to="/login" />
  );
}
