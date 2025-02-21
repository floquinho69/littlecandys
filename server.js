const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static("public"));

const users = {}; // Guardar os usuários conectados

io.on("connection", (socket) => {
    console.log("Novo usuário conectado!");

    socket.on("join", (username) => {
        users[socket.id] = username;
        io.emit("message", { username: "Sistema", message: `${username} entrou na conversa.` });
    });

    socket.on("message", (data) => {
        io.emit("message", data); // Envia a mensagem para todos
    });

    socket.on("disconnect", () => {
        const username = users[socket.id] || "Usuário";
        io.emit("message", { username: "Sistema", message: `${username} saiu da conversa.` });
        delete users[socket.id];
        console.log("Usuário desconectado!");
    });
});

server.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});
