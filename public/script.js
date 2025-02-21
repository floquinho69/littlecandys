const socket = io("https://seu-backend.onrender.com"); // Altere para a URL do backend hospedado

document.getElementById("sendButton").addEventListener("click", sendMessage);
document.getElementById("message").addEventListener("keypress", function(event) {
    if (event.key === "Enter") sendMessage();
});

function sendMessage() {
    const username = document.getElementById("username").value || "Anônimo";
    const message = document.getElementById("message").value.trim();
    
    if (message !== "") {
        socket.emit("message", { username, message }); // Envia mensagem para o servidor
        document.getElementById("message").value = ""; // Limpa o campo após enviar
    }
}

socket.on("message", (data) => {
    const chatBox = document.getElementById("chatBox");
    const newMessage = document.createElement("div");
    
    newMessage.classList.add("message");
    newMessage.innerHTML = `<strong>${data.username}:</strong> ${data.message}`;
    
    chatBox.appendChild(newMessage);
    chatBox.scrollTop = chatBox.scrollHeight; // Rolagem automática para mensagens novas
});
