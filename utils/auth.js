const passport = require('passport')
const jwt = require('jsonwebtoken')
// const bcrypt = require("bcrypt-nodejs")
const passportJWT = require('passport-jwt')
const Users = require('../models/user')
const issuer = process.env.JWT_ISSUER || "distressapp"
const ExtractJWT = passportJWT.ExtractJwt
const SALT_FACTOR = process.env.SALT_FACTOR || 6
const secretOrKey = process.env.SECRET || "distressapp";

const JWTStrategy = passportJWT.Strategy

const jwtOptions = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken("token"),
  expiresIn: '14d',
  secretOrKey,
  issuer
}
const requireAuth = passport.authenticate('jwt', {session: false})

function extractPayload(req, res, next) {
  if(typeof req.headers !== 'object') {
    return next()
  }
  res.token = req.headers['authorization'].split(" ")[1]
  res.payload = jwt.verify(res.token, jwtOptions.secretOrKey)
  next()
}

function signJWT(id, username) {
  return jwt.sign({id, username}, jwtOptions.secretOrKey, {expiresIn: jwtOptions.expiresIn})
}

passport.use(new JWTStrategy(jwtOptions, (payload, done) => {
  Users.findById(payload.id, (err, user)=> {
    if(err) return done(err)
    if (user) return done(null, user)
  })
}))

function hash(whatToHash) {
  let salt = bcrypt.genSaltSync(SALT_FACTOR)
  return bcrypt.hashSync(whatToHash, salt)
}

module.exports = (app) => {
  if(app) app.use(passport.initialize())
  return {
    jwtOptions,
    requireAuth,
    hash,
    extractPayload,
    signJWT,
  }
}