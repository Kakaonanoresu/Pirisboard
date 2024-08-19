// フロントエンドのコード
async function fetchMessages() {
    const response = await fetch('/api/messages');
    const data = await response.json();
    displayMessages(data.messages);
}

async function postMessage(userName, messageContent) {
    const response = await fetch('/api/messages', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_name: userName, message: messageContent }),
    });
    const data = await response.json();
    addMessageToUI(data.message);
}
