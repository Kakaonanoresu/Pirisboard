from flask import Flask, request, jsonify, render_template

app = Flask(__name__)

# メッセージを保存するリスト
messages = []

@app.route('/')
def home():
    return render_template('index.html', messages=messages)

@app.route('/post_message', methods=['POST'])
def post_message():
    data = request.json
    user_name = data.get('user_name')
    message = data.get('message')
    
    # メッセージをサーバーに保存
    messages.append({
        'user_name': user_name,
        'message': message
    })
    
    return jsonify({'user_name': user_name, 'message': message})

if __name__ == '__main__':
    app.run(debug=True)
