const express = require('express')
const router = express.Router()

const Url = require('../../model/url')

router.get('/', (req, res) => {
  res.render('index')
})

router.get('/:code', (req, res) => {
  Url.findOne({ shortCode: req.params.code })
    .then((url) => {
      return res.redirect(url.longUrl)
    })
    .catch(error => console.log(error))
})


module.exports = router