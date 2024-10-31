let messages = [];

export default function handler(req, res) {
  if (req.method === 'GET') {
    // メッセージを取得する
    res.status(200).json({ messages });
  } else if (req.method === 'POST') {
    // 新しいメッセージを追加する
    const { user_name, message } = req.body;
    if (!user_name || !message) {
      res.status(400).json({ error: 'Name and message are required' });
      return;
    }
    const newMessage = { user_name, message };
    messages.push(newMessage);
    res.status(201).json({ success: true, message: newMessage });
  }
}
