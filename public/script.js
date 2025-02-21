const socket = io();
const chatBox = document.getElementById("chat-box");
const messageInput = document.getElementById("message-input");
const sendButton = document.getElementById("send-button");
const themeToggle = document.getElementById("theme-toggle");

// Enviar mensagens
sendButton.addEventListener("click", () => {
    const message = messageInput.value.trim();
    if (message) {
        socket.emit("message", message);
        messageInput.value = "";
    }
});

// Receber mensagens
socket.on("message", (msg) => {
    const messageElement = document.createElement("div");
    messageElement.textContent = msg;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
});

// Modo escuro
themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    localStorage.setItem("theme", document.body.classList.contains("dark-mode") ? "dark" : "light");
});

// Verificar tema salvo
if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
}
