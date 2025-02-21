const socket = io();
let username = prompt("Digite seu nome:");

socket.emit("register", username);

const messageInput = document.getElementById("message-input");
const sendButton = document.getElementById("send-button");
const messagesContainer = document.getElementById("messages");
const darkModeButton = document.getElementById("toggle-dark-mode");

let replyingTo = null;

// Alternar Dark Mode
darkModeButton.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    darkModeButton.textContent = document.body.classList.contains("dark-mode") ? "☀️" : "🌙";
});

// Enviar mensagem
sendButton.addEventListener("click", () => {
    sendMessage();
});

messageInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") sendMessage();
});

function sendMessage() {
    const text = messageInput.value.trim();
    if (text === "") return;

    const messageData = {
        username,
        text,
        repliedTo: replyingTo
    };

    socket.emit("message", messageData);
    messageInput.value = "";
    replyingTo = null;
}

// Receber mensagem
socket.on("message", (data) => {
    const messageElement = document.createElement("div");
    messageElement.classList.add("message");
    messageElement.classList.add(data.username === username ? "self" : "other");

    messageElement.innerHTML = `<span class="username">${data.username}</span>${data.repliedTo ? `<div class="replied-message">@${data.repliedTo.username}: ${data.repliedTo.text}</div>` : ""}${data.text}`;

    // Botão de resposta
    const replyButton = document.createElement("span");
    replyButton.textContent = "↩";
    replyButton.classList.add("reply-button");
    replyButton.onclick = () => replyingTo = data;
    messageElement.appendChild(replyButton);

    messagesContainer.appendChild(messageElement);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
});
