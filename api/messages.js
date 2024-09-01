import formidable from 'formidable';
import fs from 'fs';

export const config = {
  api: {
    bodyParser: false, // デフォルトの bodyParser を無効にする
  },
};

const handler = async (req, res) => {
  if (req.method === 'POST') {
    const form = new formidable.IncomingForm();
    form.parse(req, async (err, fields, files) => {
      if (err) {
        res.status(500).json({ error: 'Error parsing the form data' });
        return;
      }

      const { user_name, message } = fields; // フォームのデータから `user_name` と `message` を取得
      const media = files.media;

      // メッセージを処理するロジックをここに追加
      res.status(200).json({ success: true, user_name, message });
    });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};

export default handler;
