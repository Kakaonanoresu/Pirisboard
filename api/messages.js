// pages/api/messages.js
const { saveMessage, getMessages } = require('../../db');

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, message } = req.body;
    const savedMessage = await saveMessage(name, message);
    res.status(200).json(savedMessage);
  } else if (req.method === 'GET') {
    const messages = await getMessages();
    res.status(200).json(messages);
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
