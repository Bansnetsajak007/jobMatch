const mongoose = require('mongoose');

const studentProfileSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  education: [{
    institution: String,
    degree: String,
    startDate: Date,
    endDate: Date,
  }],
  experience: [{
    company: String,
    role: String,
    startDate: Date,
    endDate: Date,
    description: String,
  }],
  resume: { type: String }, // Store file path or URL
  skills: [String],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('StudentProfile', studentProfileSchema);