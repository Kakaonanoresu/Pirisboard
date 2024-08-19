from flask import Flask, request, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

# データベースの設定
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///messages.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# メッセージのデータベースモデル
class Message(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_name = db.Column(db.String(50), nullable=False)
    message = db.Column(db.String(500), nullable=False)

# 初期化用（初回起動時にデータベースを作成）
with app.app_context():
    db.create_all()

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/api/messages', methods=['GET'])
def get_messages():
    messages = Message.query.all()
    message_list = [{"user_name": msg.user_name, "message": msg.message} for msg in messages]
    return jsonify({'messages': message_list})

@app.route('/api/messages', methods=['POST'])
def post_message():
    data = request.get_json()
    user_name = data['user_name']
    message = data['message']
    new_message = Message(user_name=user_name, message=message)
    db.session.add(new_message)
    db.session.commit()
    return jsonify({'message': {'user_name': user_name, 'message': message}})

if __name__ == "__main__":
    app.run(debug=True)
