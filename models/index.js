const express = require('express');
const { saveMessage, loadMessages } = require('./message');
const app = express();
app.use(express.json());

app.post('/api/messages', async (req, res) => {
  const { content, username } = req.body;
  const newMessage = await saveMessage(content, username);
  res.json(newMessage);
});

app.get('/api/messages', async (req, res) => {
  const messages = await loadMessages();
  res.json(messages);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
