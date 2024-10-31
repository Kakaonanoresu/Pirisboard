const express = require('express');
const { saveMessage, getMessages } = require('../models/db');

const router = express.Router();

router.post('/', async (req, res) => {
  const { name, message } = req.body;

  try {
    const savedMessage = await saveMessage(name, message);
    res.status(201).json(savedMessage);
  } catch (error) {
    console.error('Error saving message:', error);
    res.status(500).json({ error: 'Failed to save message' });
  }
});

router.get('/', async (req, res) => {
  try {
    const messages = await getMessages();
    res.status(200).json(messages);
  } catch (error) {
    console.error('Error retrieving messages:', error);
    res.status(500).json({ error: 'Failed to retrieve messages' });
  }
});

module.exports = router;
