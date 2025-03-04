import React from 'react';
import { GoogleLogin } from '@react-oauth/google';

const GoogleAuth = ({ setIsModalOpen, setUserId }) => {
  const responseGoogle = (response) => {
    if (response.credential) {
      const decodedData = decodeJwt(response.credential);

      console.log(decodedData);

      // Set user ID and open the modal
      setUserId(decodedData.sub); // Assuming 'sub' is the user ID
      setIsModalOpen(true); // Open the modal

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
      onSuccess={responseGoogle}
      onError={() => {
        console.log("Login failed");
        alert('Login Failed');
      }}
    />
  );
};

export default GoogleAuth;
