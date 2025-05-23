const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Job = require('../models/Job');
const EmployerProfile = require('../models/EmployerProfile');
const multer = require('multer');
const path = require('path');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage }).fields([
  { name: 'resume', maxCount: 1 },
  { name: 'coverLetter', maxCount: 1 },
]);

// POST /api/jobs - Create a new job
router.post('/', auth, async (req, res) => {
  if (req.user.role !== 'employer') {
    return res.status(403).json({ message: 'Access denied' });
  }

  const { title, description, salary, location } = req.body;
  try {
    const job = new Job({
      employer: req.user.id,
      title,
      description,
      salary,
      location,
    });
    await job.save();
    res.status(201).json(job);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/jobs - Get all jobs
router.get('/', async (req, res) => {
  try {
    const jobs = await Job.find().populate('employer', 'email');
    const jobsWithCompany = await Promise.all(
      jobs.map(async (job) => {
        const employerProfile = await EmployerProfile.findOne({ user: job.employer._id });
        return {
          ...job._doc,
          employer: {
            ...job.employer._doc,
            companyName: employerProfile ? employerProfile.companyName : 'Unknown',
          },
        };
      })
    );
    res.json(jobsWithCompany);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/jobs/:id - Get a specific job by ID (moved before /:id/apply)
router.get('/:id', async (req, res) => {
  try {
    console.log('Fetching job with ID:', req.params.id); // Debug log
    const job = await Job.findById(req.params.id).populate('employer', 'email');
    if (!job) {
      console.log('Job not found in database'); // Debug log
      return res.status(404).json({ message: 'Job not found' });
    }
    const employerProfile = await EmployerProfile.findOne({ user: job.employer._id });
    res.json({
      ...job._doc,
      employer: {
        ...job.employer._doc,
        companyName: employerProfile ? employerProfile.companyName : 'Unknown',
      },
    });
  } catch (error) {
    console.error('Error fetching job:', error); // Debug log
    res.status(500).json({ message: error.message });
  }
});

// POST /api/jobs/:id/apply - Apply to a job (moved after /:id)
router.post('/:id/apply', auth, upload, async (req, res) => {
  if (req.user.role !== 'student') {
    return res.status(403).json({ message: 'Access denied' });
  }

  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    const alreadyApplied = job.applications.some(app => app.student.toString() === req.user.id);
    if (alreadyApplied) {
      return res.status(400).json({ message: 'Already applied' });
    }

    const application = {
      student: req.user.id,
      resume: req.files.resume ? req.files.resume[0].path : 'https://example.com/dummy/resume.pdf',
      coverLetter: req.files.coverLetter ? req.files.coverLetter[0].path : 'https://example.com/dummy/coverletter.pdf',
    };

    job.applications.push(application);
    await job.save();

    res.json({ message: 'Application submitted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;