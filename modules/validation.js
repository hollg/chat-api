function isNicknameUnique (nickname, currentUsers) {
    return currentUsers.length === 0 || currentUsers.filter(u => u.nickname === nickname).length <= 0
}

function verifyNickname (nickname, currentUsers) {
  if (nickname.length === 0) {
    throw new Error('Please enter a nickname!')
  }
  if (!isNicknameUnique(nickname, currentUsers)) {
    throw new Error('That nickname is already in use!')
  }
}

module.exports = {
  isNicknameUnique: isNicknameUnique,
  verifyNickname: verifyNickname
}
