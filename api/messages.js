import fs from 'fs';
import path from 'path';

const messagesFilePath = path.join(process.cwd(), 'messages.json');

// ファイルからメッセージを読み込む関数
function loadMessages() {
    if (fs.existsSync(messagesFilePath)) {
        const data = fs.readFileSync(messagesFilePath, 'utf8');
        return JSON.parse(data);
    }
    return [];
}

// ファイルにメッセージを書き込む関数
function saveMessages(messages) {
    fs.writeFileSync(messagesFilePath, JSON.stringify(messages, null, 2), 'utf8');
}

// 初期メッセージの読み込み
let messages = loadMessages();

export default function handler(req, res) {
    if (req.method === 'GET') {
        // メッセージを返す
        res.status(200).json({ messages });
    } else if (req.method === 'POST') {
        // メッセージを追加する
        const { user_name, message } = req.body;
        const newMessage = { user_name, message, timestamp: new Date().toISOString() };
        messages.push(newMessage);
        saveMessages(messages);
        res.status(201).json({ message: newMessage });
    } else {
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
