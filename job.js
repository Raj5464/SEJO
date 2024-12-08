const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  payPerDay: { type: Number, required: true },
  location: { type: String, required: true },
  jobType: { type: String, required: true },
  availablePositions: { type: Number, required: true },
  filledPositions: { type: Number, default: 0 },
  employerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

module.exports = mongoose.model('Job', jobSchema);
