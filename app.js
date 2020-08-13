const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
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

app.post('/shorten', (req, res) => {
  res.render('index')
})

// app.get('/output', (req, res) => {
//   res.render('succeed')
// })


app.listen(PORT, (req, res) => {
  console.log(`App is running on http://localhost:${PORT}`)
})