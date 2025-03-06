import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import useGenderDetails from './hooks/useGenderDetails';
import UserForm from './components/UserForm';
import GoogleAuth from './components/GoogleAuth';
import UserDialog from './components/UserDialog';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false); 
  const[messageText,setmessageText]=useState("");
  
  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      navigate('/profile');
    }
  }, [navigate]);
  const toggleForm = () => {
    setIsLogin(!isLogin); 
  };


  useGenderDetails();

  return (
    <div className="app">
      <div className="background-image">
        <Header />
        <div className="content">
          <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
            <GoogleAuth setIsModalOpen={setIsModalOpen}  />
          </GoogleOAuthProvider>
          <UserForm toggleForm={toggleForm} isLogin={isLogin} messageText={messageText} setmessageText={setmessageText}/>

          <UserDialog 
            isOpen={isModalOpen} 
            onRequestClose={() => setIsModalOpen(false)} 
            toggleForm={toggleForm}
            setmessageText={setmessageText}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
