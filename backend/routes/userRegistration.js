  const express = require('express');
  const User = require('../models/User');
  const bcrypt = require('bcryptjs');
  const jwt = require('jsonwebtoken');
  const authMiddleware = require('../middleware/authmiddleware');

  const router = express.Router();

  router.post('/register', async (req, res) => {
    const { name, email, age, dateofbirth, password, gender, about } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = new User({
      name,
      email,
      age,
      dateofbirth,
      password,
      gender,
      about
    });

    try {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);

      const userData = await user.save();

      const token = jwt.sign({ id: userData._id }, 'shivasaineelam', { expiresIn: '2h' });

      res.cookie('token', token, {
        httpOnly: true,  
        secure: false, 
        sameSite: 'Strict', 
        maxAge: 3600000*2
      });

      res.status(201).json({
        message: 'User created successfully',
        user: userData
      });
    } catch (error) {
      res.status(400).json({ message: 'Error creating user', error: error.message });
    }
  });

  router.get('/users', authMiddleware, async (req, res) => {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching users', error: error.message });
    }
  });

  router.patch('/update', authMiddleware, async (req, res) => {
      try {
        const user = await User.findByIdAndUpdate(req.user.id, req.body, { new: true });
        
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
      } catch (error) {
        res.status(400).json({ message: 'Error updating user', error: error.message });
      }
    });
    
  router.delete('/delete', authMiddleware, async (req, res) => {
      try {
        const user = await User.findByIdAndDelete(req.user.id);
        
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
      } catch (error) {
        res.status(400).json({ message: 'Error deleting user', error: error.message });
      }
    });
    

  router.post('/logout', (req, res) => {

    res.clearCookie('token', { httpOnly: true, secure: false });
    res.status(200).json({ message: 'User logged out successfully' });
  });

  module.exports = router;
