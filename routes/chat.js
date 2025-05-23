const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.js');
const Message = require('../models/Message.js');

router.post('/message', auth, async (req, res) => {
  const { receiverId, jobId, content } = req.body;
  console.log(req.body);
  try {
    const message = new Message({
      sender: req.user.id,
      receiver: receiverId,
      job: jobId,
      content,
    });
    await message.save();
    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/messages/:jobId', auth, async (req, res) => {
  try {
    const messages = await Message.find({
      job: req.params.jobId,
      $or: [
        { sender: req.user.id },
        { receiver: req.user.id },
      ],
    }).populate('sender receiver', 'email');
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;