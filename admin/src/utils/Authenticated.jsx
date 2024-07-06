import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useGetUserDataQuery } from '../redux/features/api/apiSlice';

const Authenticated = ({ children }) => {
  const { data: userData, isLoading, isError, isSuccess, error } = useGetUserDataQuery();

  useEffect(() => {
    if (isError) {
    }
  }, [isError]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isSuccess) {
    return <Navigate to="/login" replace />;
  }

  // Check if user has admin role or other specific conditions
  const isAdmin = userData?.user?.role === 'admin';

  console.log("is admin", isAdmin)

  return isAdmin ? <>{children}</> : <Navigate to="/login" replace />;
};

export default Authenticated;
