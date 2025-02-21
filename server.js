const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static("public"));

const users = {}; // Armazena usuários conectados

io.on("connection", (socket) => {
    console.log("Novo usuário conectado!");

    // Registrar nome do usuário
    socket.on("register", (username) => {
        users[socket.id] = username;
        io.emit("message", { 
            username: "Sistema", 
            text: `${username} entrou na conversa`, 
            system: true 
        });
    });

    // Mensagem enviada
    socket.on("message", (data) => {
        io.emit("message", data);
    });

    // Desconexão do usuário
    socket.on("disconnect", () => {
        if (users[socket.id]) {
            io.emit("message", { 
                username: "Sistema", 
                text: `${users[socket.id]} saiu da conversa`, 
                system: true 
            });
            delete users[socket.id];
        }
        console.log("Usuário desconectado!");
    });
});

server.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});
