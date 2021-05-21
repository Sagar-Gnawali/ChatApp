const socket = io.connect('http://localhost:8099');
var data = {
    user_name: document.getElementById('user_name'),
    message: document.getElementById('message'),
    output: document.getElementById('output'),
    btn: document.getElementById('send'),
    typing: document.getElementById("typing")
}
data.message.addEventListener('keypress', () => {
    socket.emit('typing', data.user_name.value);
})
data.btn.addEventListener('click', () => {
    socket.emit('chat', {
        message: data.message.value,
        user_name: data.user_name.value
    })
})
socket.on('chat', (res) => {
    data.typing.innerHTML = "";
    data.message.value = '';
    data.output.innerHTML = (res.message?('<p><strong>' + res.user_name + ': </strong>' + res.message + '</p>'):null);
})
socket.on('typing', (name) => {
    data.typing.innerHTML = '<p><em>' + name + ' is typing message...</p>';
})
