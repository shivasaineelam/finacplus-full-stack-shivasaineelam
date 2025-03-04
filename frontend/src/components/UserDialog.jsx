import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';

const UserDialog = ({ isOpen, onRequestClose, userId }) => {
  const [formData, setFormData] = useState({
    age: '',
    dateofbirth: '',
    password: '',
    about: '',
  });

  // useEffect(() => {
  //   if (userId) {
  //     axios.get(`http://localhost:5000/user/${userId}`, { withCredentials: true })
  //       .then((res) => {
  //         setFormData(res.data);
  //       })
  //       .catch((err) => console.log(err));
  //   }
  // }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
   
    console.log("submit the data")
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
      <h2>Complete Your Profile</h2>
      <form onSubmit={handleSubmit}>
        <input type="number" name="age" value={formData.age} onChange={handleChange} placeholder="Age" required />
        <input type="date" name="dateofbirth" value={formData.dateofbirth} onChange={handleChange} required />
        <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" required />
        <textarea name="about" value={formData.about} onChange={handleChange} placeholder="About" maxLength="5000"></textarea>
        <button type="submit">Save</button>
      </form>
    </Modal>
  );
};

export default UserDialog;
