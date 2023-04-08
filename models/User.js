import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const schema = mongoose.Schema;

const UserSchema = new schema({
  name: {
    type: String,
    required: [true, 'Please provide a valid name (3-20 characters)'],
    minlength: [3, 'Name is too short (3 characters at least)'],
    maxlength: [20, 'Name is too long (3 characters at most)'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Please provide a valid email'],
    validate: {
      validator: validator.isEmail,
      message: 'Please provide a valid email',
    },
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Please provide a valid password (6 or more characters)'],
    minlength: [6, 'Password is too short (6 characters at least)'],
    select: false,
  },
  lastName: {
    type: String,
    maxlength: 20,
    trim: true,
    default: 'lastName',
  },
  location: {
    type: String,
    maxlength: 20,
    trim: true,
    default: 'kafr potata city',
  },
});

// not triggered by findandupdate
UserSchema.pre('save', async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.createJWT = function () {
  return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
  // return jwt.sign({ userId: this._id.toString() }, 'jwtpotatas', {
  //   expiresIn: '1d',
  // });
};

export default mongoose.model('User', UserSchema);
