import mongoose from 'mongoose';
const schema = mongoose.Schema;

const JobSchema = new schema(
  {
    company: {
      type: String,
      required: [true, 'Please provide company'],
      maxlength: [50, 'Company name too long'],
    },
    position: {
      type: String,
      required: [true, 'Please provide position'],
      maxlength: [100, 'Position name too long'],
    },
    status: {
      type: String,
      enum: ['interview', 'declined', 'pending'],
      default: 'pending',
    },
    jobType: {
      type: String,
      enum: ['full-time', 'part-time', 'remote', 'internship'],
      default: 'full-time',
    },
    jobLocation: {
      type: String,
      default: 'my city',
      required: true,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'Pleased provide user'],
    },
  },
  { timestamps: true }
);

export default mongoose.model('Job', JobSchema);
