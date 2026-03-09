const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Job title is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Job description is required']
  },
  company: {
    type: String,
    required: [true, 'Company name is required']
  },
  location: {
    type: String,
    required: [true, 'Location is required']
  },
  jobType: {
    type: String,
    enum: ['Full-time', 'Part-time', 'Remote', 'Contract', 'Internship'],
    default: 'Full-time'
  },
  salary: {
    min: { type: Number },
    max: { type: Number },
    currency: { type: String, default: 'INR' }
  },
  skills: [String],
  experience: {
    type: String,
    enum: ['Fresher', '1-2 years', '2-5 years', '5+ years'],
    default: 'Fresher'
  },
  category: {
    type: String,
    enum: ['Technology', 'Marketing', 'Finance', 'Design', 'Sales', 'HR', 'Other'],
    default: 'Technology'
  },
  employer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  applicants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Application'
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  deadline: Date,
}, { timestamps: true });

module.exports = mongoose.model('Job', jobSchema);
