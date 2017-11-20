import express from 'express'
import socket from 'socket.io'

import InitialiseSockets from './socket/index.js'

// App setup
const app = express()
const port = process.env.PORT || 4040
const server = app.listen(`${port}`, () => console.log(`Listening on port: ${port}`))

// Sockets stuff
const io = socket(server)
let currentUsers = []

InitialiseSockets(io, currentUsers)