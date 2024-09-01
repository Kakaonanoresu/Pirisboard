async function submitForm(event) {
    event.preventDefault();

    const user_name = document.getElementById('user_name').value;
    const message = document.getElementById('message').value;
    const fileInput = document.getElementById('media');
    const formData = new FormData();
    
    formData.append('user_name', user_name);
    formData.append('message', message);

    if (fileInput.files[0]) {
        formData.append('media', fileInput.files[0]);
    }

    try {
        const response = await fetch('/api/messages', {
            method: 'POST',
            body: formData,
        });

        if (response.ok) {
            loadMessages(); // メッセージをリロード
            document.getElementById('user_name').value = '';
            document.getElementById('message').value = '';
            fileInput.value = '';
            scrollToBottom();
        } else {
            console.error('投稿に失敗しました', response.statusText);
        }
    } catch (error) {
        console.error('エラーが発生しました', error);
    }
}
