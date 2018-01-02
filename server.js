const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const routes = require('./routes/index')
mongoose.Promise = require('bluebird')
const app = express()
const port = process.env.PORT || 4321

app.use(bodyParser({extended: false}))

app.use('/', routes)

app.listen(port, err => {
  if (err) {
    return console.log("An error occurred")
  }
  console.log(`Servver running on port ${port}`)
})
