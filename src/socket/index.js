import verifyNickname from '../helpers/validation.js'
import randomHex from '../helpers/colourGenerator.js'

export default function InitialiseSockets(io, currentUsers) {
  io.on('connection', socket => {
    console.log(`Made socket connection: ${socket.id}`)

    var hex = randomHex()
    socket.emit('hex', {hex})

    socket.on('chat', data => {
      io.sockets .emit('chat', data)
    })

    socket.on('nickname', data => {
      try {
        verifyNickname(data.nickname, currentUsers)
        currentUsers.push({nickname: data.nickname, id: socket.id})
        socket.emit('nickname', data)
        socket.broadcast.emit('userJoined', data)
      } catch (err) {
        console.log(`Error: ${err.message} (id: ${socket.id})`)
        socket.emit('validationError', {errorMessage: err.message})
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
}
