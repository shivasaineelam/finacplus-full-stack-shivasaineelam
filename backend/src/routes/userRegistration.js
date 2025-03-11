const express = require('express');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authMiddleware = require('../middleware/authmiddleware');
const ResponseFormatter = require('../responder/responseFormatter');
const { validationMiddleware, validate } = require('../middleware/usermiddleware');
const { loginValidationMiddleware, validateLogin } = require('../middleware/usermiddleware');

const router = express.Router();

router.post('/register', validationMiddleware, validate, async (req, res) => {
  const { name, email, age, dateofbirth, password, gender, about } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return ResponseFormatter.operationSuccess(res, "", 'User already exists', 400);
    }


    const user = new User({
      name,
      email,
      age,
      dateofbirth,
      password,
      gender,
      about,
    });

    const userData = await user.save();

    const token = jwt.sign({ id: userData._id }, 'finacplusbackend', { expiresIn: '2h' });

    res.cookie('token', token, {
      httpOnly: false,
      secure: false,  
      sameSite: 'None',
      maxAge: 3600000 * 2,
    });

    return ResponseFormatter.operationSuccess(res, userData, 'User created successfully', 201);

  } catch (error) {
    console.error('Error creating user:', error);
    return ResponseFormatter.operationFailed(res, error.message, 'Error creating user', 500);
  }
});

router.post('/login', loginValidationMiddleware, validateLogin, async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return ResponseFormatter.operationSuccess(res, "", 'User does not exist. Please register first.', 404);
    }

    const isMatch = await bcrypt.compare(password.trim(), user.password);
    if (!isMatch) {
      return ResponseFormatter.operationSuccess(res, "", 'Invalid credentials. Please check your password.', 401);
    }

    const token = jwt.sign({ id: user._id }, 'finacplusbackend', { expiresIn: '2h' });

    res.cookie('token', token, {
      httpOnly: false,
      secure: false,
      sameSite: 'None',
      maxAge: 3600000 * 2,
    });

    return ResponseFormatter.operationSuccess(res, {
      name: user.name,
      email: user.email,
      age: user.age,
      gender: user.gender,
      about: user.about,
    }, 'Login successful', 200);

  } catch (error) {
    console.error('Error during login:', error);
    return ResponseFormatter.operationFailed(res, error.message, 'Server error', 500);
  }
});

router.get('/users', authMiddleware, async (req, res) => {
  try {
    const users = await User.find();
    return ResponseFormatter.operationSuccess(res, users, 'Users fetched successfully', 200);
  } catch (error) {
    console.error('Error fetching users:', error);
    return ResponseFormatter.operationFailed(res, error.message, 'Error fetching users', 500);
  }
});

router.get('/user', authMiddleware, async (req, res) => {
  try {
    const users = await User.findById(req.user.id);
    return ResponseFormatter.operationSuccess(res, users, 'User fetched successfully', 200);
  } catch (error) {
    console.error('Error fetching users:', error);
    return ResponseFormatter.operationFailed(res, error.message, 'Error fetching users', 500);
  }
});

router.patch('/update', authMiddleware, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.user.id, req.body, { new: true });

    if (!user) {
      return ResponseFormatter.operationFailed(res, "", 'User not found', 404);
    }

    return ResponseFormatter.operationSuccess(res, user, 'User updated successfully', 200);
  } catch (error) {
    console.error('Error updating user:', error);
    return ResponseFormatter.operationFailed(res, error.message, 'Error updating user', 500);
  }
});

router.delete('/delete', authMiddleware, async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.user.id);

    if (!user) {
      return ResponseFormatter.operationFailed(res, "", 'User not found', 404);
    }

    return ResponseFormatter.operationSuccess(res, "", 'User deleted successfully', 200);
  } catch (error) {
    console.error('Error deleting user:', error);
    return ResponseFormatter.operationFailed(res, error.message, 'Error deleting user', 500);
  }
});

router.post('/logout', (req, res) => {
  res.clearCookie('token', { httpOnly: false, secure: false });
  return ResponseFormatter.operationSuccess(res, "", 'User logged out successfully', 200);
});

module.exports = router;
