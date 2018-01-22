require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const routes = require('./routes/index')
mongoose.Promise = require('bluebird')
const app = express()
const port = process.env.PORT || 4321
const isProduction = process.env.PROD === true

require('./utils/mongoose')
require('./utils/auth')(app)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

if(!isProduction) {
  console.log("Not in production")
  app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:4200")
    res.setHeader("Access-Control-Allow-Method", "GET,POST,DELETE")
    res.setHeader("Access-Control-Allow-Headers", "Content-type,Authorization")
    next()
  })
}

app.options('*', (req, res) =>{
  res.json({ res: "pre-flight" })
})
app.use('/api', routes)
app.get("/google-oauth-callback", (req, res) => {
  console.log(req.user)
  res.json(req.user)
})
app.get("/fb-auth-callback", (req, res) => {
  console.log(req.user)
  res.json(req.user)
})
app.listen(port, err => {
  if (err) {
    return console.log("An error occurred")
  }
  console.log(`Server running on port ${port}`)
})