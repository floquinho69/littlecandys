const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static("public"));

io.on("connection", (socket) => {
    console.log("Novo usuário conectado!");

    socket.on("message", (data) => {
        io.emit("message", data); // Envia a mensagem para todos os usuários conectados
    });

    socket.on("disconnect", () => {
        console.log("Usuário desconectado!");
    });
});

server.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});
