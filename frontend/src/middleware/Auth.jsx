import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import { getRole } from '../utils/getToken';
import { config } from '../config';
import axios from 'axios';
import useUser from '../hooks/HookUser';

const Auth = ({ children, auth, adminOnly = false }) => {
  const { fixRole, getUser } = useUser()
  const token = localStorage.getItem('token') || sessionStorage.getItem('token');

  useEffect(() => {
    getUser()
  }, [])

  if (auth) {
    if (!token || (adminOnly && fixRole !== 'admin')) {
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
