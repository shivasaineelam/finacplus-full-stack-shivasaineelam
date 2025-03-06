import React, { useState } from 'react';
import Modal from 'react-modal';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { calculateAgeFromYear, validatePasswordfunction } from '../helpers/validationHelpers';
import PasswordComponent from './PasswordComponent';
import { loginUserApi } from '../helpers/api_helpers';

const UserDialog = ({ isOpen, onRequestClose ,toggleForm,setmessageText}) => {
  const [formData, setFormData] = useState({
    age: '',
    dateofbirth: '',
    password: '',
    about: '',
    gender: ''
  });

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [validationFeedback, setValidationFeedback] = useState({
    lengthValid: false,
    lowercaseValid: false,
    uppercaseValid: false,
    numberValid: false,
    symbolValid: false,
  });

  const user = useSelector((state) => state.user);
  const genders = useSelector((state) => state.gender?.types);
  const navigate = useNavigate();

  const calculateAge =(dob)=>calculateAgeFromYear(dob);

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
      setFormData({
        ...formData,
        [name]: value,
      });
    }

    if (name === "password") validatePassword(value);
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

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleGenderChange = (e) => {
    const gender = e.target.value;
    setFormData({
      ...formData,
      gender: gender,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fullFormData = {
      ...formData,
      name: user?.name,
      email: user?.email,
    };

    try {

      const response=await loginUserApi(fullFormData);
      navigate('/profile'); 
      return response;
    } catch (error) {
      let msg=error?.response?.data?.message;
      if(msg==="User already exists"){
        onRequestClose();
        toggleForm();
        setmessageText("user already exists ,please login");
      }
    }
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} className="modal-container">
      <div className="modal-content">
        <h2>Complete Your Profile</h2>
        <form onSubmit={handleSubmit}>
          <input 
            type="number" 
            name="age" 
            value={formData.age} 
            onChange={handleChange} 
            placeholder="Age" 
            required 
            disabled 
          />
          <input 
            type="date" 
            name="dateofbirth" 
            value={formData.dateofbirth} 
            onChange={handleChange} 
            required 
          />

          <select 
            name="gender" 
            value={formData.gender} 
            onChange={handleGenderChange} 
            required
          >
            <option value="">Select Gender</option>
            {genders && genders.map((gender, index) => (
              <option key={index} value={gender}>{gender}</option>
            ))}
          </select>

          <PasswordComponent 
            passwordVisible={passwordVisible} 
            handleChange={handleChange} 
            formData={formData} 
            togglePasswordVisibility={togglePasswordVisibility} 
            validationFeedback={validationFeedback}
          />

          <textarea 
            name="about" 
            value={formData.about} 
            onChange={handleChange} 
            placeholder="About" 
            maxLength="5000"
          />

          <button type="submit">Save</button>
        </form>
      </div>
    </Modal>
  );
};

export default UserDialog;
