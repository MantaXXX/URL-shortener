const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const Url = require('./model/url')
const generateShortCode = require('./generateShortCode')
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
  let input = req.query.url
  let checkUrl = input.indexOf('http://')
  if (checkUrl < 0) {
    return res.send('Please input valid URL')
  } else getShortCode()
  function getShortCode() {
    // get short code
    let code = generateShortCode()
    Url.find()
      .lean()
      .then(url => {
        // check if duplicate in database
        if (url.find(element => element.shortCode === code)) {
          return getShortCode()
        } else {
          const longUrl = input
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

// copy
// app.post('/copy', (req, res) => {
//   let copyListener = document.querySelector('.copy')
//   copyListener.addEventListener('click', () => {
//     // document.querySelector('.copy-content').select()
//     document.execCommand('copy')
//   })
// })

app.listen(PORT, (req, res) => {
  console.log(`App is running on http://localhost:${PORT}`)
})