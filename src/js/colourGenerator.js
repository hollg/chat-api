export default function randomHex () {
  return '#' + (Math.random().toString(16) + '000000').slice(2, 8)
}