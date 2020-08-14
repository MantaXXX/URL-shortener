const mongoose = require('mongoose')
const Schema = mongoose.Schema
const urlSchema = new Schema({
  shortCode: {
    type: String,
    required: true
  },
  longUrl: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Url', urlSchema)
