import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const ProfilePage = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const token = Cookies.get('token');
    if (!token) {
        console.log(token)
      navigate('/');
    }
  }, [navigate]);

  return (
    <div>
      <h2>Welcome, {user?.name || 'User'}</h2>
      <p>Email: {user?.email}</p>
      <p>Age: {user?.age}</p>
      <p>About: {user?.about}</p>
    </div>
  );
};

export default ProfilePage;
