'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _socket = require('socket.io');

var _socket2 = _interopRequireDefault(_socket);

var _validation = require('./js/validation.js');

var _validation2 = _interopRequireDefault(_validation);

var _colourGenerator = require('./js/colourGenerator.js');

var _colourGenerator2 = _interopRequireDefault(_colourGenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

// App setup
var port = process.env.PORT || 4040;
var server = app.listen('' + port, function () {
  return console.log('Listening on port: ' + port);
});

// Sockets stuff
var io = (0, _socket2.default)(server);
var currentUsers = [];

io.on('connection', function (socket) {
  console.log('Made socket connection: ' + socket.id);

  var hex = (0, _colourGenerator2.default)();
  socket.emit('hex', { hex: hex });

  socket.on('chat', function (data) {
    io.sockets.emit('chat', data);
  });

  socket.on('nickname', function (data) {
    try {
      (0, _validation2.default)(data.nickname, currentUsers);
      currentUsers.push({ nickname: data.nickname, id: socket.id });
      socket.emit('nickname', data);
      socket.broadcast.emit('userJoined', data);
    } catch (err) {
      console.log('Error: ' + err.message + ' (id: ' + socket.id + ')');
      socket.emit('validationError', {
        errorMessage: err.message
      });
    }
  });

  socket.on('startTyping', function (data) {
    socket.broadcast.emit('userStartTyping', data);
  });

  socket.on('stopTyping', function (data) {
    socket.broadcast.emit('userStopTyping', data);
  });

  socket.on('disconnect', function () {
    currentUsers = currentUsers.filter(function (u) {
      return u.id !== socket.id;
    });
  });
});