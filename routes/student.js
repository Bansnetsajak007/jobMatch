const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.js');
const StudentProfile = require('../models/StudentProfile.js');

router.post('/profile', auth, async (req, res) => {
  if (req.user.role !== 'student') {
    return res.status(403).json({ message: 'Access denied' });
  }

  const { firstName, lastName, education, experience, resume, skills } = req.body;
  try {
    let profile = await StudentProfile.findOne({ user: req.user.id });
    if (profile) {
      profile = await StudentProfile.findOneAndUpdate(
        { user: req.user.id },
        { $set: { firstName, lastName, education, experience, resume, skills } },
        { new: true }
      );
      return res.json(profile);
    }

    profile = new StudentProfile({
      user: req.user.id,
      firstName,
      lastName,
      education,
      experience,
      resume,
      skills,
    });
    await profile.save();
    res.status(201).json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/profile', auth, async (req, res) => {
  if (req.user.role !== 'student') {
    return res.status(403).json({ message: 'Access denied' });
  }

  try {
    const profile = await StudentProfile.findOne({ user: req.user.id });
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;