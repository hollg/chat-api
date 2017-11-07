const app = require('express')()
const socket = require('socket.io')

// App setup
const port = '4040'
const server = app.listen(`${port}`, () => console.log(`Listening on port: ${port}`))

// Sockets stuff
const io = socket(server)

function randomHex () {
  return '#' + (Math.random().toString(16) + '000000').slice(2, 8)
}

io.on('connection', socket => {
  console.log(`Made socket connection: ${socket.id}`)

  var hex = randomHex()
  socket.emit('hex', {hex})

  socket.on('chat', data => {
    io.sockets.emit('chat', data)
  })
})
