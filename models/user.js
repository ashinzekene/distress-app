const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  email: String,
  password: String,
  firstName: String,
  lastName: String,
  bio: String,
  provider: String,
  photoUrl: String,
  ip: String,
  facebookID: String,
  googleID: String,
  lastSeen: String,
  following: String
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;