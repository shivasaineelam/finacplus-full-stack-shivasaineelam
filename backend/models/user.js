const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2
  },
  age: {
    type: Number,
    required: true,
    min: 0,
    max: 120
  },
  dateofbirth: {
    type: Date,
    required: true
  },
  password: {
    type: String,
    required: true,
    minlength: 10
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Non-binary', 'Prefer not to say'],
    required: true
  },
  about: {
    type: String,
    maxlength: 5000
  },
  email: {
  type: String,
  required: true,
  unique: true,
  validate: {
    validator: function(value) {
      return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(value);
    },
    message: 'Please provide a valid email address'
  }
}
}, { timestamps: true });

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.matchPassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
