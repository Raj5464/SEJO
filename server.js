const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const User = require('./models/User');
const Job = require('./models/Job');
const Application = require('./models/Application');

const app = express();
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://localhost/sejo', { useNewUrlParser: true, useUnifiedTopology: true });

// Routes and API Endpoints
// Employer and Employee login routes
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  // Authenticate user here, return JWT token
  res.send('Logged in');
});

// Employer posts a job
app.post('/jobs', (req, res) => {
  const { employerId, title, description, location, hourlyRate } = req.body;
  const newJob = new Job({ employerId, title, description, location, hourlyRate });
  newJob.save();
  res.send('Job posted');
});

// Employee applies for a job
app.post('/apply', (req, res) => {
  const { employeeId, jobId } = req.body;
  const newApplication = new Application({ employeeId, jobId });
  newApplication.save();
  res.send('Application submitted');
});

app.listen(5000, () => console.log('Server started on port 5000'));
