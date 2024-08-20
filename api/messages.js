import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema({
    text: String,
    timestamp: { type: Date, default: Date.now }
});

const Message = mongoose.model('Message', MessageSchema);

export async function handler(req, res) {
    await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

    if (req.method === 'POST') {
        const message = new Message({ text: req.body.text });
        await message.save();
        return res.status(200).json({ message: 'Message saved' });
    } else if (req.method === 'GET') {
        const messages = await Message.find({});
        return res.status(200).json(messages);
    } else {
        return res.status(405).json({ message: 'Method not allowed' });
    }
}
