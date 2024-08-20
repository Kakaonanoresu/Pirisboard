import { MongoClient, ServerApiVersion } from 'mongodb';

// MongoDB 接続 URI
const uri = process.env.MONGO_URI;

// MongoDB クライアントの作成
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

const databaseName = 'messages';
const collectionName = 'messages';

async function getCollection() {
  try {
    await client.connect();
    return client.db(databaseName).collection(collectionName);
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
}

export default async function handler(req, res) {
  try {
    const collection = await getCollection();

    if (req.method === 'POST') {
      const message = { text: req.body.text, timestamp: new Date() };
      await collection.insertOne(message);
      res.status(200).json({ message: 'Message saved' });
    } else if (req.method === 'GET') {
      const messages = await collection.find({}).toArray();
      res.status(200).json(messages);
    } else {
      res.status(405).json({ message: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Error handling request:', error);
    res.status(500).json({ message: 'Internal server error' });
  } finally {
    await client.close();
  }
}
