const express = require('express');
const { addMessage, getMessages } = require('./messages'); // 修正したmessages.jsを読み込み
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public'));

// メッセージ取得エンドポイント
app.get('/api/messages', (req, res) => {
    res.json({ messages: getMessages() });
});

// メッセージ投稿エンドポイント
app.post('/api/messages', (req, res) => {
    const { user_name, message } = req.body;
    const newMessage = addMessage(user_name, message);
    res.json({ message: newMessage });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
