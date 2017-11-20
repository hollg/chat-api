'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _socket = require('socket.io');

var _socket2 = _interopRequireDefault(_socket);

var _index = require('./socket/index.js');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// App setup
var app = (0, _express2.default)();
var port = process.env.PORT || 4040;
var server = app.listen('' + port, function () {
  return console.log('Listening on port: ' + port);
});

// Sockets stuff
var io = (0, _socket2.default)(server);
var currentUsers = [];

(0, _index2.default)(io, currentUsers);