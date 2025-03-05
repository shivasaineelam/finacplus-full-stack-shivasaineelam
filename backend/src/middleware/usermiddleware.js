const { body, validationResult } = require('express-validator');
const ResponseFormatter = require('../responder/responseFormatter');

const loginValidationMiddleware = [
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required'),
];

const validateLogin = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = {
      status: 400,
      message: 'Validation failed for login',
      data: errors.array(),
    };
    return ResponseFormatter.operationFailed(res, error.data, error.message,400);
  }
  next();
};

const validationMiddleware = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password should be at least 6 characters'),
  body('age').isInt({ min: 18 }).withMessage('Age must be at least 18'),
  body('dateofbirth').isDate().withMessage('Valid date of birth is required'),
];

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = {
      status: 400,
      message: 'Validation failed for registration',
      data: errors.array(),
    };
    return ResponseFormatter.operationFailed(res, error.data, error.message,400);
  }
  next();
};

module.exports = { validationMiddleware, validate, loginValidationMiddleware, validateLogin };
