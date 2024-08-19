const fs = require('fs');
const path = require('path');

// メッセージを保存するファイルのパス
const messagesFilePath = path.join(__dirname, 'messages.json');

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

// メッセージを追加する関数
function addMessage(user_name, message) {
    const newMessage = { user_name, message, timestamp: new Date().toISOString() };
    messages.push(newMessage);
    saveMessages(messages);
    return newMessage;
}

// メッセージを取得する関数
function getMessages() {
    return messages;
}

module.exports = { addMessage, getMessages };
