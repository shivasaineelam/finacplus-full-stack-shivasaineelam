import React, { useState } from 'react';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserDialog = ({ isOpen, onRequestClose }) => {
  const [formData, setFormData] = useState({
    age: '',
    dateofbirth: '',
    password: '',
    about: '',
    gender: ''
  });

  const user = useSelector((state) => state.user); // Access name and email from Redux
  const genders = useSelector((state) => state.gender?.types); // Access gender types from Redux
  const navigate = useNavigate(); // Use navigate to redirect after API call

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
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
      const url = `${import.meta.env.VITE_USER_REGISTRATION_BACKEND}/api/v1/register`;
      const response = await axios.post(url, fullFormData, { withCredentials: true });
      navigate('/profile'); 
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
      <h2>Complete Your Profile</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="number" 
          name="age" 
          value={formData.age} 
          onChange={handleChange} 
          placeholder="Age" 
          required 
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

        <input 
          type="password" 
          name="password" 
          value={formData.password} 
          onChange={handleChange} 
          placeholder="Password" 
          required 
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
    </Modal>
  );
};

export default UserDialog;
