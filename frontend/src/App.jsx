import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import useGenderDetails from './hooks/useGenderDetails';
import UserForm from './components/UserForm';
import GoogleAuth from './components/GoogleAuth';
import UserDialog from './components/UserDialog';
import { GoogleOAuthProvider } from '@react-oauth/google';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userId, setUserId] = useState(null);

  
  useGenderDetails();

  

  return (
    <div>
      <Header />
      <UserForm />
      <GoogleOAuthProvider clientId="81372339458-a5qqdu626b3ih3pfmo5v6ct1njku5hht.apps.googleusercontent.com">
        <div>
          <GoogleAuth setIsModalOpen={setIsModalOpen} setUserId={setUserId} />
        </div>
      </GoogleOAuthProvider>
      <div>
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
