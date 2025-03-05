import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import { setUser } from '../utlils/useSlice.js';

const GoogleAuth = ({ setIsModalOpen }) => {
  const dispatch = useDispatch();

  const responseGoogle = (response) => {
    if (response.credential) {
      const decodedData = decodeJwt(response.credential);
      const userData = {
        name: decodedData.name,
        email: decodedData.email
      };
      dispatch(setUser(userData));
      setIsModalOpen(true);
    } else {
      console.log("Error: No credential received");
    }
  };

  const decodeJwt = (token) => {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const decodedData = JSON.parse(window.atob(base64));
    return decodedData;
  };

  return (
    <GoogleLogin 
      useOneTap
      theme="filled_blue"
      onSuccess={responseGoogle}
      onError={() => {
        console.log("Login failed");
        alert('unable to login at this moment');
      }}
    />
  );
};

export default GoogleAuth;
