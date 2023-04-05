import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

interface IPrivateRouteProps {
  authentication: boolean;
}

export default function PrivateRoute({ authentication }: IPrivateRouteProps) {
  const isLogin = localStorage.getItem('accessToken');

  if (authentication) {
    return isLogin === null ? <Navigate to="/sign-in" /> : <Outlet />;
  } else {
    return isLogin === null ? <Outlet /> : <Navigate to="/" />;
  }
}
