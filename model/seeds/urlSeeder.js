const db = require('../../config/mongoose')
const urlData = require('../../url.json').results
const Url = require('../url')


db.once('open', () => {
  urlData.forEach(data => {
    Url.create({
      shortCode: `${data.shortCode}`,
      longUrl: `${data.longUrl}`
    })
  })
})

