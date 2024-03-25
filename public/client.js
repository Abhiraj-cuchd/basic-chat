const socket = io("http://localhost:5000")

let userName;

let message = document.querySelector('#textarea');
let messageArea = document.querySelector('.message__area');

do {
    userName = prompt('Please enter your name')
} while (!userName);

message.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        sendMessage(e.target.value);
        message.value = ''
    }

});

const sendMessage = (msg) => {
    let msgPayload = {
        user: userName,
        message: msg.trim()
    }

    appendMessage(msgPayload, 'outgoing');
    scrollToBottom();

    //Sockets Implementaion

    socket.emit('message', msgPayload)
}

socket.on('message', (msg) => {
    appendMessage(msg, 'incoming');
    scrollToBottom()
})

const appendMessage = (data, type) => {
    let mainDiv = document.createElement('div');

    let className = type;

    mainDiv.classList.add(className, 'message');

    let markup = `
        <h4>${data.user}</h4>
        <p>${data.message}</p>
    `
    mainDiv.innerHTML = markup;

    messageArea.appendChild(mainDiv);
}

const scrollToBottom = () => {
    messageArea.scrollTop = messageArea.scrollHeight
}