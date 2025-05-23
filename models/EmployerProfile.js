const mongoose = require('mongoose');

const employerProfileSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  companyName: { type: String, required: true },
  companyDescription: { type: String },
  website: { type: String },
  location: { type: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('EmployerProfile', employerProfileSchema);