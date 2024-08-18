const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

let messages = []; // メッセージの保存

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.emit('loadMessages', messages); // 既存メッセージの送信

    socket.on('newMessage', (message) => {
        messages.push(message);
        io.emit('newMessage', message); // 全クライアントにメッセージを送信
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

server.listen(3000, () => {
    console.log('Server is running on port 3000');
});
