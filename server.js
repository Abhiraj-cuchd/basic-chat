import express from 'express'
import { Server } from 'socket.io'
import { createServer } from 'http'
import { fileURLToPath } from 'url';
import path from 'path';

const app = express();

const PORT = 5000;
const server = createServer(app);


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

//Sockets

const io = new Server(server);

io.on("connection", (socket) => {
    console.log("Welcome to server" , socket.id);

    socket.on("message", (data) => {
        socket.broadcast.emit('message', data);
    })
})


server.listen(PORT, () => {
    console.log(`Server running Sockets at port: ${PORT}`);
})
