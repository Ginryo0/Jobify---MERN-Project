import mongoose from 'mongoose';

const schema = mongoose.Schema();

const UserSchema = new schema({
  name: {
    type: String,
    required: [true, 'Please provide name'],
    minlength: 3,
    maxlength: 20,
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Please provide email'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Please provide password'],
    minlength: 6,
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

export default mongoose.model('User', UserSchema);
