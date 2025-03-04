import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';

const GoogleAuth = () => {
  const responseGoogle = (response) => {
    axios.post('http://localhost:5000/google-login', { token: response.credential }, { withCredentials: true })
      .then((res) => {
        alert('Logged in with Google!');
      })
      .catch((error) => {
        alert('Error logging in with Google');
      });
  };

  return (
    <GoogleLogin
      onSuccess={responseGoogle}
      onError={() => alert('Login Failed')}
    />
  );
};

export default GoogleAuth;
