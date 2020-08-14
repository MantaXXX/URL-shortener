const mongoose = require('mongoose')
const urlData = require('../../url.json').results
const Url = require('../url')
mongoose.connect('mongodb://localhost/url-shortener', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

db.on('error', () => {
  console.log('mongoDB error!')
})

db.once('open', () => {
  console.log('mongoDB connected!')
  urlData.forEach(data => {
    Url.create({
      shortCode: `${data.shortCode}`,
      longUrl: `${data.longUrl}`
    })
  })
})

