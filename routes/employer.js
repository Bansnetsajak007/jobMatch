const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const EmployerProfile = require('../models/EmployerProfile');

router.get('/profile', auth, async (req, res) => {
  try {
    const profile = await EmployerProfile.findOne({ user: req.user.id });
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// New route to fetch employer profile by ID
router.get('/profile/:employerId', async (req, res) => {
  try {
    const profile = await EmployerProfile.findOne({ user: req.params.employerId });
    if (!profile) {
      return res.status(404).json({ message: 'Employer profile not found' });
    }
    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/profile', auth, async (req, res) => {
  try {
    const { companyName, companyDescription, website, location } = req.body;
    let profile = await EmployerProfile.findOne({ user: req.user.id });

    if (profile) {
      profile.companyName = companyName;
      profile.companyDescription = companyDescription;
      profile.website = website;
      profile.location = location;
    } else {
      profile = new EmployerProfile({
        user: req.user.id,
        companyName,
        companyDescription,
        website,
        location,
      });
    }

    await profile.save();
    res.status(201).json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;