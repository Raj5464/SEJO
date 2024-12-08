const express = require('express');
const Job = require('../models/Job');
const verifyToken = require('../middleware/verifyToken');

const router = express.Router();

// Post a Job (Employer only)
router.post('/post', verifyToken, async (req, res) => {
  const { title, payPerDay, location, jobType, availablePositions } = req.body;
  if (req.user.role !== 'employer') return res.status(403).json({ message: 'Only employers can post jobs' });

  try {
    const newJob = new Job({ title, payPerDay, location, jobType, availablePositions, employerId: req.user.userId });
    await newJob.save();
    res.status(201).json({ message: 'Job posted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error posting job' });
  }
});

// Get Jobs (for Employees)
router.get('/jobs', async (req, res) => {
  const { location, jobType } = req.query;
  try {
    const jobs = await Job.find({ location, jobType, availablePositions: { $gt: 0 } });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching jobs' });
  }
});

// Update Job (when positions are filled)
router.put('/update/:id', verifyToken, async (req, res) => {
  const { id } = req.params;
  try {
    const job = await Job.findById(id);
    if (!job) return res.status(404).json({ message: 'Job not found' });

    if (job.filledPositions < job.availablePositions) {
      job.filledPositions += 1;
      await job.save();
      res.json({ message: 'Job position filled' });
    } else {
      res.status(400).json({ message: 'No available positions left' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error updating job' });
  }
});

module.exports = router;
