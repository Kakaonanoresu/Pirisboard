// api/messages.js
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    throw new Error(
        'Please define the MONGODB_URI environment variable inside .env.local'
    );
}

/** 接続のキャッシュ */
let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

async function connectToDatabase() {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        const opts = {
            bufferCommands: false,
        };

        cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
            return mongoose;
        });
    }
    cached.conn = await cached.promise;
    return cached.conn;
}

// メッセージのスキーマとモデル
const messageSchema = new mongoose.Schema({
    user_name: String,
    message: String,
    timestamp: { type: Date, default: Date.now },
});

const Message = mongoose.models.Message || mongoose.model('Message', messageSchema);

export default async function handler(req, res) {
    await connectToDatabase();

    if (req.method === 'GET') {
        // 全てのメッセージを取得
        const messages = await Message.find({});
        res.status(200).json({ messages });
    } else if (req.method === 'POST') {
        // 新しいメッセージを保存
        const { user_name, message } = req.body;
        const newMessage = await Message.create({ user_name, message });
        res.status(201).json({ message: newMessage });
    } else {
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
