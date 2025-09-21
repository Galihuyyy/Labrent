import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import useUser from '../hooks/HookUser';
import Spinner from '../components/elements/Spinner';

const Auth = ({ children, auth, adminOnly = false }) => {
  const { fixRole, getUser, loading } = useUser();
  const [failed, setFailed] = useState(false);
  const token = localStorage.getItem('token') || sessionStorage.getItem('token');

  useEffect(() => {
    const fetchUser = async () => {
      if (token) {
        const success = await getUser();
        if (!success) {
          localStorage.clear();
          sessionStorage.clear();
          setFailed(true);
        }
      }
    };
    if (auth) fetchUser()
  }, [token]);

   useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === 'token') {
        window.location.reload();
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  if (loading) {
    return (
      <div className='w-full min-h-svh relative grid place-items-center'>
        <Spinner />
      </div>
    );
  }

  if (failed) {
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = "/auth";
    return null;
  }


  if (auth) {
    if (!token || (adminOnly && fixRole !== 'admin')) {
      window.location.href = "/auth";
      return null
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
  adminOnly: PropTypes.bool,
};

export default Auth;
