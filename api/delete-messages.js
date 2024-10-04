// Expressアプリの設定例
const express = require('express');
const app = express();

// メッセージのデータを保存するための例（DBに置き換え）
let messages = [];

// メッセージを取得するエンドポイント
app.get('/api/messages', (req, res) => {
    res.json({ messages });
});

// メッセージを削除するエンドポイント
app.delete('/api/delete-messages', (req, res) => {
    // すべてのメッセージを削除
    messages = [];
    res.status(200).json({ message: 'すべてのメッセージが削除されました' });
});

// サーバー起動
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
