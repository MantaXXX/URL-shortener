const express = require('express')
const router = express.Router()

const home = require('./modules/home')
const url = require('./modules/url')

router.use('/', home)
router.use('/shorten', url)

module.exports = router