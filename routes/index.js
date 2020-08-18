const express = require('express')
const router = express.Router()

const home = require('./modules/home')
const url = require('./modules/url')

router.use('/shorten', url)
router.use('/', home)

module.exports = router