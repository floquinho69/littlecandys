const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "https://phelbox.netlify.app", // Permite conexão do frontend hospedado no Netlify
        methods: ["GET", "POST"]
    }
});

app.use(express.static("public"));
app.use(cors());

io.on("connection", (socket) => {
    console.log("Novo usuário conectado!");

    socket.on("message", (data) => {
        io.emit("message", data); // Envia a mensagem para todos os usuários conectados
    });

    socket.on("disconnect", () => {
        console.log("Usuário desconectado!");
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
