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
        res.status(500).json({ error: 'フォームデータの解析中にエラーが発生しました' });
        return;
      }

      const { user_name, message } = fields;
      const media = files.media;

      if (!user_name || !message) {
        res.status(400).json({ error: 'ユーザー名とメッセージは必須です' });
        return;
      }

      // メディアファイルの処理（必要に応じて追加）
      if (media) {
        const data = fs.readFileSync(media.filepath);
        fs.writeFileSync(`./uploads/${media.originalFilename}`, data);
      }

      // メッセージをサーバーに保存するロジックをここに追加
      res.status(200).json({ success: true, user_name, message });
    });
  } else {
    res.status(405).json({ error: '許可されていないメソッドです' });
  }
};

export default handler;
