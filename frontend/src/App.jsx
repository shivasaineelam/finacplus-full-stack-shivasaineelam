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
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false); 
  const[isAccountExist,setISAccountExist]=useState("");
  
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
          <GoogleOAuthProvider clientId="81372339458-a5qqdu626b3ih3pfmo5v6ct1njku5hht.apps.googleusercontent.com">
            <GoogleAuth setIsModalOpen={setIsModalOpen} setUserId={setUserId} />
          </GoogleOAuthProvider>
          <UserForm toggleForm={toggleForm} isLogin={isLogin} isAccountExist={isAccountExist} setISAccountExist={setISAccountExist}/>

          <UserDialog 
            isOpen={isModalOpen} 
            onRequestClose={() => setIsModalOpen(false)} 
            userId={userId} 
            toggleForm={toggleForm}
            setISAccountExist={setISAccountExist}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
