const app = require('express')(),
    socket = require('socket.io');

// App setup
const port = "4040";
const server = app.listen(`${port}`, () => console.log(`Listening on port: ${port}`)
)

// Sockets stuff
const io = socket(server)

io.on("connection", socket => {
    console.log(`Made socket connection: ${socket.id}`);

    socket.on("chat", data => {
        io.sockets.emit('chat', data)
    })
})