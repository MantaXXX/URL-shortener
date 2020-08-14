const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const Url = require('./model/url')
const PORT = 3000

mongoose.connect('mongodb://localhost/url-shortener', { useNewUrlParser: true, useUnifiedTopology: true })
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
  // get short code
  let number = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]
  let lowerLetter = 'abcdefghijklmnopqrstuvwxyz'
  let upperLetter = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  let lowerLetterArray = lowerLetter.split('')
  let upperLetterArray = upperLetter.split('')
  let totalArray = number.concat(lowerLetterArray, upperLetterArray)
  let shortCode = ''
  for (let i = 0; i < 5; i++) {
    const index = Math.floor(Math.random() * totalArray.length)
    shortCode += totalArray[index]
  }
  // check if duplicate in database
  Url.find({ shortCode: shortCode })
    .lean()
    .then(url => {
      if (url.shortCode) {
        console.log('exist!')
      } else {
        const longUrl = req.query.url
        Url.create({
          shortCode,
          longUrl
        })
      }
      res.render('finished', { shortCode })
    })
    .catch(error => console.log(error))
  // let searchResult = Url.find({ shortCode: "1FdM6" }).lean()

  // if not, create; if yes, recreate
  // console.log(searchResult.schema.obj.shortCode.type)

})

app.listen(PORT, (req, res) => {
  console.log(`App is running on http://localhost:${PORT}`)
})