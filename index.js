const app = require('express')()
const socket = require('socket.io')

// App setup
const port = process.env.PORT || 4040
const server = app.listen(`${port}`, () => console.log(`Listening on port: ${port}`))

// Sockets stuff
const io = socket(server)
let currentUsers = []

function randomHex () {
  return '#' + (Math.random().toString(16) + '000000').slice(2, 8)
}

function isNicknameUnique(users, nickname) {
  return users.filter( u => u.nickname === nickname).length <= 0
}

io.on('connection', socket => {
  console.log(`Made socket connection: ${socket.id}`)

  var hex = randomHex()
  socket.emit('hex', {hex})

  socket.on('chat', data => {
    io.sockets.emit('chat', data)
  })

  socket.on('nickname', data => {
    if (isNicknameUnique(currentUsers, data.nickname) && data.nickname.length != 0){
      currentUsers.push({nickname: data.nickname, id: socket.id})
      socket.emit('nickname', data)
      socket.broadcast.emit('userJoined', data)
    }
  })

  socket.on('startTyping', (data) => {
    socket.broadcast.emit('userStartTyping', data)
  })

  socket.on('stopTyping', (data) => {
    socket.broadcast.emit('userStopTyping', data)
  })

  socket.on('disconnect', () => {
    currentUsers = currentUsers.filter(u => u.id !== socket.id)
  })

})
