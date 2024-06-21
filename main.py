from flask import Flask, render_template, request, redirect, url_for, make_response, g, jsonify
import sqlite3

app = Flask(__name__)

# データベースの設定
DATABASE = 'messages.db'

def get_db():
    db = getattr(g, '_database', None)
    if db is None:
        db = g._database = sqlite3.connect(DATABASE)
    return db

@app.teardown_appcontext
def close_connection(exception):
    db = getattr(g, '_database', None)
    if db is not None:
        db.close()

def init_db():
    with app.app_context():
        db = get_db()
        cursor = db.cursor()
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS messages (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_name TEXT NOT NULL,
                message_text TEXT NOT NULL
            )
        ''')
        db.commit()

@app.route("/", methods=["GET", "POST"])
def home():
    if request.method == "POST":
        user_name = request.form.get("user_name")
        message_text = request.form.get("message")

        # メッセージをデータベースに保存する
        db = get_db()
        cursor = db.cursor()
        cursor.execute('INSERT INTO messages (user_name, message_text) VALUES (?, ?)', (user_name, message_text))
        db.commit()

        return jsonify({"user_name": user_name, "message_text": message_text})

    # データベースからメッセージを取得する
    db = get_db()
    cursor = db.cursor()
    cursor.execute('SELECT user_name, message_text FROM messages')
    messages = cursor.fetchall()

    # テーマを取得
    theme = request.cookies.get('theme', 'light')

    return render_template("index.html", messages=messages, theme=theme, enumerate=enumerate)

@app.route("/switch_theme", methods=["POST"])
def switch_theme():
    theme = request.cookies.get('theme', 'light')

    # テーマを切り替える
    if theme == 'light':
        new_theme = 'dark'
    else:
        new_theme = 'light'

    # クッキーに新しいテーマを保存
    response = make_response(redirect(url_for("home")))
    response.set_cookie('theme', new_theme, max_age=30*24*60*60)  # 30日間有効

    return response

if __name__ == "__main__":
    init_db()
    app.run(debug=False)
