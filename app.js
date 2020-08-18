const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const Url = require('./model/url')
const PORT = process.env.PORT || 3000

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/url-shortener"
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

db.on('error', () => {
  console.log('mongoDB error!')
})

db.once('open', () => {
  console.log('mongoDB connected!')
})

const app = express()

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.get('/', (req, res) => {
  res.render('index')
})

app.get('/shorten', (req, res) => {
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
  getShortCode()
  function getShortCode() {
    // get short code
    let code = generateShortCode()
    Url.find()
      .lean()
      .then(url => {
        // check if duplicate in database
        if (url.shortCode === code) {
          return getShortCode()
        } else {
          const longUrl = req.query.url
          const shortCode = code
          Url.create({
            shortCode,
            longUrl
          })
          res.render('finished', { shortCode })
        }
      })
      .catch(error => console.log(error))
  }
})

app.get('/:code', (req, res) => {
  Url.findOne({ shortCode: req.params.code })
    .then((url) => {
      return res.redirect(url.longUrl)
    })
    .catch(error => console.log(error))
})


app.listen(PORT, (req, res) => {
  console.log(`App is running on http://localhost:${PORT}`)
})