'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = randomHex;
function randomHex() {
  return '#' + (Math.random().toString(16) + '000000').slice(2, 8);
}