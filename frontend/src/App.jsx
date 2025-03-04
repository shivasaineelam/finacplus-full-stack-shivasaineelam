import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import useGenderDetails from './hooks/useGenderDetails';
import UserForm from './components/UserForm';
import GoogleAuth from './components/GoogleAuth';
import GitHubAuth from './components/GithubAuth';
import UserDialog from './components/UserDialog';
import { GoogleOAuthProvider } from '@react-oauth/google';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userId, setUserId] = useState(null);

  const handleLogin = (id) => {
    setUserId(id);
    setIsModalOpen(true);
  };

  useGenderDetails();

  return (
    <div>
      <Header /> 
      <UserForm />
      <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
        <div>
          <h1>Welcome to my app!</h1>
          <GoogleAuth />
        </div>
      </GoogleOAuthProvider>
      <div>
        <GitHubAuth onLogin={handleLogin} />
        <UserDialog 
          isOpen={isModalOpen} 
          onRequestClose={() => setIsModalOpen(false)} 
          userId={userId} 
        />
      </div>
    </div>
  );
}

export default App;
