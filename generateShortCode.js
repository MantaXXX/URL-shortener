const { model } = require("./model/url")

function generateShortCode() {
  let number = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]
  let lowerLetter = 'abcdefghijklmnopqrstuvwxyz'
  let upperLetter = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  let lowerLetterArray = lowerLetter.split('')
  let upperLetterArray = upperLetter.split('')
  let totalArray = number.concat(lowerLetterArray, upperLetterArray)
  let code = ''
  for (let i = 0; i < 5; i++) {
    const index = Math.floor(Math.random() * totalArray.length)
    code += totalArray[index]
  }
  return code
}

module.exports = generateShortCode