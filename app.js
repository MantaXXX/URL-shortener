const express = require('express')
const exphbs = require('express-handlebars')
const routes = require('./routes')
const PORT = process.env.PORT || 3000
require('./config/mongoose')

const app = express()

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(routes)


app.listen(PORT, (req, res) => {
  console.log(`App is running on http://localhost:${PORT}`)
})