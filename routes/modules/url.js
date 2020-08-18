const express = require('express')
const router = express.Router()

const Url = require('../../model/url')
const generateShortCode = require('../../generateShortCode')

router.get('/', (req, res) => {
  let input = req.query.url
  let checkUrl = input.indexOf('https://')
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


// copy
// app.get('/copy', (req, res) => {
//   let copy = document.querySelector('.copy')
//   copy.addEventListener('click', () => {
//     document.querySelector('.copy-content').select()
//     document.execCommand('copy')
//   })
// })


module.exports = router