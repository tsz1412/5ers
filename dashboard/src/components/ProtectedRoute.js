import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import { observer } from 'mobx-react-lite';

const ProtectedRoute = observer(({ children }) => {
  const authStore = useAuthStore();

  // Check if the user is authenticated
  if (!authStore.isAuthenticated) {
    // If not authenticated, redirect to login
    return <Navigate to="/" />;
  }

  // If authenticated, render the children (protected component)
  return children;
});

export default ProtectedRoute;
