const socket = io("https://seu-backend.onrender.com"); // Atualize a URL do backend

let username = prompt("Digite seu nome:");
if (!username) username = "Anônimo";
socket.emit("join", username);

// Paleta de cores para os usuários
const userColors = {};
const colors = ["#FF5733", "#33FF57", "#5733FF", "#FFD700", "#FF33A1", "#33FFF5"];

function getUserColor(name) {
    if (!userColors[name]) {
        userColors[name] = colors[Object.keys(userColors).length % colors.length];
    }
    return userColors[name];
}

document.getElementById("sendButton").addEventListener("click", sendMessage);
document.getElementById("message").addEventListener("keypress", function(event) {
    if (event.key === "Enter") sendMessage();
});

function sendMessage() {
    const message = document.getElementById("message").value.trim();
    if (message !== "") {
        socket.emit("message", { username, message });
        document.getElementById("message").value = "";
    }
}

socket.on("message", (data) => {
    const chatBox = document.getElementById("chatBox");
    const newMessage = document.createElement("div");

    newMessage.classList.add("message");

    // Verifica se há menção a algum usuário
    let formattedMessage = data.message.replace(/@(\w+)/g, (match, mentionedUser) => {
        return `<span class="mention">@${mentionedUser}</span>`;
    });

    newMessage.innerHTML = `
        <strong style="color: ${getUserColor(data.username)}">${data.username}:</strong> ${formattedMessage}
        <span class="reply" onclick="replyTo('${data.username}', '${data.message}')">↩</span>
    `;

    if (data.username === "Sistema") {
        newMessage.style.color = "gray";
        newMessage.style.fontStyle = "italic";
    }

    chatBox.appendChild(newMessage);
    chatBox.scrollTop = chatBox.scrollHeight;
});

function replyTo(user, message) {
    document.getElementById("message").value = `@${user} ${message} `;
    document.getElementById("message").focus();
}

/* Alternar entre Dark Mode e Light Mode */
const themeToggle = document.getElementById("themeToggle");
themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    // Salva a preferência do usuário
    const isDarkMode = document.body.classList.contains("dark-mode");
    localStorage.setItem("darkMode", isDarkMode);
});

// Aplica o tema salvo
if (localStorage.getItem("darkMode") === "true") {
    document.body.classList.add("dark-mode");
}
