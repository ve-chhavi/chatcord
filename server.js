
const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Set static folder to access
app.use(express.static(path.join(__dirname, 'public')));

// Run when client connects
io.on('connection', socket => {
    console.log('New Web Socket Connected here ...........');

    // This broadcast to a single client
    socket.emit('message', 'Welcome to ChatCord!');

    // This will broadcast to all clients except the one joined
    socket.broadcast.emit('message', 'A user has joined the chat');

    // This will broadcast all
    io.emit('message', 'A broadcasting message for all!');

    // Runs when user disconnects
    socket.on('disconnect', () => {
        io.emit('message', 'A user has left the chat');
    });

    socket.on('chatMessage', (msg) => {
        io.emit('message', msg);
    });
});

const PORT = 3000 || process.env.PORT;
server.listen(PORT, () => console.log(`server running on ${PORT}`));
