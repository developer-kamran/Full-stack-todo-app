import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useGlobalAuthContext } from '../Context/AuthContext';

const PrivateRoute = ({ children, ...rest }) => {
  let location = useLocation();
  const { user } = useGlobalAuthContext();
  return user ? children : <Navigate to='./login' state={{ from: location }} />;
};

export default PrivateRoute;
