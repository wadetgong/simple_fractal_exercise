const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')

const app = express()
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use(express.static('./public'))

app.use('/api', require('./server/api'))

app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, '/public/index.html'))
})

app.use((req, res, next, err) => {
  console.error(err)
})

app.listen(3000, () => {
  console.log('Server listening on port 3000.')
})
