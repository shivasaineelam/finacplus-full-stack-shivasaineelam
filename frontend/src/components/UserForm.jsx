import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { validateEmail, validatePasswordfunction } from './../helpers/validationHelpers'; 
import registerUser from './../utlils/registerUser';
import { FaEye, FaEyeSlash } from 'react-icons/fa';  

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    dateofbirth: '',
    password: '',
    about: '',
    gender: ''
  });

  const [emailValid, setEmailValid] = useState(null);
  const [passwordValid, setPasswordValid] = useState(null);
  const [validationFeedback, setValidationFeedback] = useState({
    lengthValid: false,
    lowercaseValid: false,
    uppercaseValid: false,
    numberValid: false,
    symbolValid: false,
  });

  const [showTooltip, setShowTooltip] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const genders = useSelector((state) => state.gender?.types);

  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth();
    const day = today.getDate();

    if (month < birthDate.getMonth() || (month === birthDate.getMonth() && day < birthDate.getDate())) {
      age--;
    }
    return age;
  };

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

    if (name === 'password') {
      validatePassword(value);
    }

    if (name === 'about') {
      if (value.length === 5000) {
        setShowTooltip(true);
        setTimeout(() => setShowTooltip(false), 3000);
      }
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

    setPasswordValid(passwordValid);
    return passwordValid;
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

    const emailIsValid = validateEmail(formData.email);
    const passwordValidation = validatePassword(formData.password);
    setEmailValid(emailIsValid);
    setPasswordValid(passwordValidation);

    if (emailIsValid && passwordValidation) {
      try {
        await registerUser(formData);
      } catch (error) {
        console.error("Error during registration:", error);
      }
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);  
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
      <input 
        type="email" 
        name="email" 
        value={formData.email} 
        onChange={handleChange} 
        placeholder="Email" 
        required 
      />
      {emailValid === false && (
        <span className="invalid">Invalid Email</span>
      )}

      <input type="number" name="age" value={formData.age} onChange={handleChange} placeholder="Age" required disabled />
      <input type="date" name="dateofbirth" value={formData.dateofbirth} onChange={handleChange} required />
      
      <div className="password-container">
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
          onClick={togglePasswordVisibility} 
          style={{ cursor: 'pointer' }}
        >
          {passwordVisible ? <FaEyeSlash /> : <FaEye />}  
        </span>
        <div className="password-requirements">
          <span className={validationFeedback.lengthValid ? "valid" : "invalid"}>
            Password must be at least 10 characters.
          </span>
          <span className={validationFeedback.lowercaseValid ? "valid" : "invalid"}>
            Password must include at least one lowercase letter.
          </span>
          <span className={validationFeedback.uppercaseValid ? "valid" : "invalid"}>
            Password must include at least one uppercase letter.
          </span>
          <span className={validationFeedback.numberValid ? "valid" : "invalid"}>
            Password must include at least one number.
          </span>
          <span className={validationFeedback.symbolValid ? "valid" : "invalid"}>
            Password must include at least one symbol (!@#$%^&*).
          </span>
        </div>
      </div>
      
      <select name="gender" value={formData.selectedGender} onChange={handleGenderChange} required>
        <option value="">Select Gender</option>
        {genders && genders?.map((gender, index) => (
          <option key={index} value={gender}>
            {gender}
          </option>
        ))}
      </select>

      <textarea name="about" value={formData.about} onChange={handleChange} placeholder="About" maxLength="5000"></textarea>

      {showTooltip && <div className="tooltip">Maximum characters reached</div>}

      <button type="submit" >Register</button>
    </form>
  );
};

export default RegistrationForm;
