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

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}.`)
})
