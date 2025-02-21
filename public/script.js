const socket = io();
const chatBox = document.getElementById("chat-box");
const messageInput = document.getElementById("message-input");

let username = prompt("Digite seu nome (Mac, Caio, BlackMetal, Frank):") || "Anônimo";

function sendMessage() {
    const messageText = messageInput.value.trim();

    if (messageText === "") return;

    const messageData = {
        username: username,
        message: messageText
    };

    socket.emit("message", messageData);

    messageInput.value = "";
}

socket.on("message", (data) => {
    const messageElement = document.createElement("div");
    messageElement.classList.add("message");

    if (data.username === username) {
        messageElement.classList.add("sent");
    } else {
        messageElement.classList.add("received");
    }

    messageElement.innerHTML = `<div class="username">${data.username}</div>${data.message}`;

    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
});

messageInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        sendMessage();
    }
});
