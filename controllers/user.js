const User = require('../models/user')
const { signJWT, hash } = require('../utils/auth')()

module.exports = {
  getByUsername(req, res) {
    User.findOne({ username: req.params.user }, "-password")
      .then(user => {
        if (!user) {
          return res.status(403).json({ err: "Could not find any user" })
        }
        res.json(user)
      })
      .catch(err => {
        res.status(403).json({ err: "An error occurred, could not retrieve user" })
      })
  },
  getById(req, res) {
    User.findById(req.params.user, "-password")
      .then(user => {
        if (!user) {
          return res.status(403).json({ err: "Could not find any user" })
        }
        res.json(user)
      })
      .catch(err => {
        res.status(403).json({ err: "An error occurred, could not retrieve user" })
      })
  },
  create(req, res) {
    let { username, email, firstname, lastname, bio, password } = req.body
    let user = new User()
    user.username = username
    user.password = password
    user.email = email
    bio ? user.bio = bio : null
    firstname ? user.firstname = firstname : null
    lastname ? user.lastname = lastname : null
    user.save()
      .then(user => {
        user = user.toJSON()
        user.token = signJWT(user._id, username)
        console.log(user.token)
        res.json(user)
      })
      .catch(err => {
        console.log(err)
        if (err.code === 11000) {
          return res.status(403).json({ result: "You already have an account" })
        }
        res.status(403).json({ err: "An error occurred, could not create account" })
      })
  },
  login() {
    let { username, password, email } = req.body 
    User.findOne({ username, password }, "-password")
      .then(user => {
        if (!user) {
          return res.status(403).json({ result: "Username or password is not correct" })          
        }
        user.token = signJWT(user._id, user.username)
        res.json(user)
      })
      .catch(err => {
        res.status(403).json({ err: "An error occurred, could not retrieve your account" })
      })
  },
  update(req, res) {
    let { username, email, fistname, lastname, bio } = req.body
    let user = {}
    // username ? user.username = username : null
    // email ? user.email = email : null
    bio ? user.bio = bio : null
    firstname ? user.firstname = firstname : null
    lastname ? user.lastname = lastname : null
    User.findByIdAndUpdate(req.user.id, user, { new: true })
      .select("-password")
      .then(user => {
        res.json(user)
      })
      .catch(err => {
        res.status(403).json({ err: "An error occurred, could not update account" })
      })
    },
  all(req, res) {
    User.find()
      .then(users => {
        res.json(users)
      })
      .catch(err => {
        res.status(501).json({ err: "Could not retieve all users" })
      })
  },
  removeAll(req, res) {
    User.remove()
      .then(users => {
        res.json(users)
      })
      .catch(err => {
        res.status(403).json({ err: "Could not reomve all users" })
      })
  }
}
