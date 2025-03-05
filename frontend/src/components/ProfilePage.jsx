import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';

const ProfilePage = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const token = Cookies.get('token');
    if (!token) {
      navigate('/');
      return;
    }

    const fetchUserData = async () => {
      try {
        const url = `${import.meta.env.VITE_USER_REGISTRATION_BACKEND}/api/v1/user`;
        const response = await axios.get(url, { withCredentials: true });
        setUserInfo(response?.data?.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    
    fetchUserData();
  }, [navigate]);
  
  if (!userInfo) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h2 className="welcome-text">Welcome, {userInfo?.name || 'User'}</h2>
        <div className="user-info">
          <p><strong>Email:</strong> {userInfo?.email}</p>
          <p><strong>Age:</strong> {userInfo?.age}</p>
          <p><strong>About:</strong> {userInfo?.about || 'No additional information provided.'}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
