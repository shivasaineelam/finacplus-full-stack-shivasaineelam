import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { validateEmail, validatePasswordfunction, calculateAgeFromYear } from './../helpers/validationHelpers'; 
import { useNavigate } from 'react-router-dom'; 
import PasswordComponent from './PasswordComponent';
import { loginUserApi, registerUserApi } from '../helpers/api_helpers';
import ClosedEyeIcon from '../assets/icons/ClosedEye';
import OpenEyeIcon from '../assets/icons/OpenEye';

const RegistrationForm = ({ toggleForm, isLogin, messageText, setmessageText }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    dateofbirth: '',
    password: '',
    about: '',
    gender: ''
  });
  const navigate = useNavigate();
  const [validationFeedback, setValidationFeedback] = useState({
    lengthValid: false,
    lowercaseValid: false,
    uppercaseValid: false,
    numberValid: false,
    symbolValid: false,
  });
  const [passwordVisible, setPasswordVisible] = useState(false);

  const genders = useSelector((state) => state.gender?.types);
  const calculateAge = (dob) => calculateAgeFromYear(dob);

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    if (name === 'dateofbirth' && value) {
      const age = calculateAge(value);
      setFormData({
        ...formData,
        [name]: value,
        age: age, 
      });
    } else {
      if (name === "age") {
        if (value !== "" && isNaN(value) || Number(value) < 0 || Number(value) > 100) {
          setmessageText('Please enter a valid age (between 0 and 100).');
        } else {
          setmessageText("");
        }
      } else if (name === "about") {
        if (value.length > 5000) {
          setmessageText('Maximum character limit reached (5000 characters)');
          return ;
        } else {
          setmessageText("");
        }
      }
  
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  
    if (name === 'password') {
      validatePassword(value);
    }
  };
  

  const validatePassword = (password) => {
    const {
      lengthCheck,
      lowerCaseCheck,
      upperCaseCheck,
      numberCheck,
      symbolCheck,
      passwordValid
    } = validatePasswordfunction(password);

    setValidationFeedback({
      lengthValid: lengthCheck,
      lowercaseValid: lowerCaseCheck,
      uppercaseValid: upperCaseCheck,
      numberValid: numberCheck,
      symbolValid: symbolCheck,
    });

    return passwordValid;
  };

  const handleGenderChange = (e) => {
    const gender = e.target.value;
    setFormData({
      ...formData,
      gender: gender,
    });
  };

  const loginUser = async (formData) => {
    try {
      const response = await loginUserApi({ email: formData.email, password: formData.password });
  
      if (response.status === 200) {
        navigate('/profile');
      }
    } catch (error) {
      if (error?.response?.status === 401) {
        setmessageText("The password you entered is incorrect. Please try again.");
      }
      else if (error?.response?.status === 404) {
        toggleForm();
        setmessageText("User not found. Please register.")
      } 
      else {
        console.error("An error occurred during login", error);
      }
    }
  };

  const registerUser = async (formData) => {
    try {  
      const response = await registerUserApi(formData);
      navigate('/profile'); 
      return response;
    } catch (error) {
      let msg = error?.response?.data?.message;
      if (msg === "User already exists") {
        toggleForm();
        setmessageText("User already exists, please login");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(formData.name.length<2){
      setmessageText('Please enter a valid name (at least 2 characters).');
      return;
    }
    const emailIsValid = validateEmail(formData.email);
    const passwordValidation = validatePassword(formData.password);
    if(!emailIsValid){setmessageText("Please enter a valid email address.");return ;}
    if (emailIsValid && passwordValidation || isLogin) {
      try {
        if (isLogin) {
          await loginUser(formData);
        } else {
          await registerUser(formData);
        }
      } catch (error) {
        console.error("Error during signup/login", error);
      }
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);  
  };

  useEffect(() => {
    setFormData({
      name: '',
      email: '',
      age: '',
      dateofbirth: '',
      password: '',
      about: '',
      gender: ''
    });
    setValidationFeedback({
      lengthValid: false,
      lowercaseValid: false,
      uppercaseValid: false,
      numberValid: false,
      symbolValid: false,
    });
    setPasswordVisible(false);
    setmessageText('');
  }, [isLogin]);

  return (
    <div>
      <div>
        <button onClick={() => {  toggleForm(); }} className="toggle-form">
          {isLogin ? "New here? Create an account" : "Already a member? Sign in"}
        </button>
      </div>
      <form onSubmit={handleSubmit}>

        {!isLogin && (
          <>
            {messageText && <div>{messageText}</div>}
            <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
            <input 
              type="email" 
              name="email" 
              value={formData.email} 
              onChange={handleChange} 
              placeholder="Email" 
              required 
            />

            <input type="text" name="age" value={formData.age} onChange={handleChange} placeholder="Age" required  />

            <input type="date" name="dateofbirth" value={formData.dateofbirth} onChange={handleChange} required />
            
            <PasswordComponent passwordVisible={passwordVisible} handleChange={handleChange} formData={formData} togglePasswordVisibility={togglePasswordVisibility} validationFeedback={validationFeedback}/>

            <select name="gender" value={formData.selectedGender} onChange={handleGenderChange} required>
              <option value="">Select Gender</option>
              {genders && genders?.map((gender, index) => (
                <option key={index} value={gender}>{gender}</option>
              ))}
            </select>

            <textarea name="about" value={formData.about} onChange={handleChange} placeholder="About" ></textarea>

          </>
        )}

        {isLogin && (
          <>
            {messageText && <div className='user-exist'>{messageText}</div>}
            <input 
              type="email" 
              name="email" 
              value={formData.email} 
              onChange={handleChange} 
              placeholder="Email" 
              required 
            />
            <input 
              type={passwordVisible ? "text" : "password"}  
              name="password" 
              value={formData.password} 
              onChange={handleChange} 
              placeholder="Password" 
              required 
              minLength="10" 
            />
            <span 
              className="eye-icon" 
              onClick={() => togglePasswordVisibility()} 
              style={{ cursor: 'pointer', color: 'black' }}
            >
              {passwordVisible ? (
                <ClosedEyeIcon width="24" height="24"/>
              ) : (
                <OpenEyeIcon width="24" height="24" />
              )}
            </span>
          </>
        )}
        <button className="toggle-form" type="submit">{isLogin ? 'Login' : 'Register'}</button>
      </form>
    </div>
  );
};

export default RegistrationForm;
