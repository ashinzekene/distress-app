const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
  },
  firstname: String,
  lastname: String,
  bio: String,
  avatar: String,
  ip: String,
  lastseen: String,
  following: String
})

const User = mongoose.model('User', userSchema)

module.exports = User