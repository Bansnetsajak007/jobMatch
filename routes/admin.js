const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Job = require('../models/Job');

// Admin authentication middleware
const adminAuth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Since we're using a static admin, we just check if the token is valid and has admin role
    if (decoded.role !== 'admin') {
      throw new Error();
    }
    
    req.token = token;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Not authorized as admin' });
  }
};

// Admin login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    if (username !== 'admin' || password !== 'admin') {
      return res.status(401).json({ message: 'Invalid admin credentials' });
    }

    const token = jwt.sign({ id: 'admin', role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all users
router.get('/users', adminAuth, async (req, res) => {
  try {
    const users = await User.find({}, 'email role createdAt').lean();
    
    // Get job application counts for each user
    const usersWithJobCounts = await Promise.all(users.map(async (user) => {
      const jobCount = await Job.countDocuments({
        'applications.student': user._id
      });
      return { ...user, jobApplications: jobCount };
    }));

    res.json(usersWithJobCounts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete user
router.delete('/users/:id', adminAuth, async (req, res) => {
  try {
    const userId = req.params.id;
    
    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Delete user and their job applications
    await User.findByIdAndDelete(userId);
    await Job.updateMany(
      { 'applications.student': userId },
      { $pull: { applications: { student: userId } } }
    );

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;