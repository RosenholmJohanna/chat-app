import React from 'react';
import { Outlet, Navigate, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectAuthToken } from '../authSlice';
import authSlice from '../authSlice';


// Navigate vs useNavigate

const ProtectedRoute = ({children}) => {
  //const token = useSelector((state) => state.auth.jwtToken);
  const token = useSelector(selectAuthToken);
 

  return token ? children || <Outlet /> : <Navigate to="/" />;
};


export default ProtectedRoute;

