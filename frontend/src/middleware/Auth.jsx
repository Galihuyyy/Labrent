import React from 'react';
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import { getRole } from '../utils/getToken';

const Auth = ({ children, auth, adminOnly = false }) => {
  const token = localStorage.getItem('token') || sessionStorage.getItem('token');

  if (auth) {
    if (!token || (adminOnly && getRole() !== 'admin') || (!adminOnly && getRole() === 'admin')) {
      return <Navigate to="/auth" replace />;
    }
    return children;
  } else {
    if (token) {
      return <Navigate to="/" replace />;
    }
    return children;
  }
};

Auth.propTypes = {
  children: PropTypes.node.isRequired,
  auth: PropTypes.bool.isRequired,
};

export default Auth;
