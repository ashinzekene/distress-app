const passport = require('passport');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt-nodejs');
const passportJWT = require('passport-jwt');
const FbStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const Users = require('../models/user');
const issuer = process.env.JWT_ISSUER || 'distressapp';
const ExtractJWT = passportJWT.ExtractJwt;
const SALT_FACTOR = process.env.SALT_FACTOR || 6;
const secretOrKey = process.env.SECRET || 'distressapp';

const JWTStrategy = passportJWT.Strategy;

const jwtOptions = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  // expiresIn: '14d',
  secretOrKey: 'key',
  // issuer
};
const JWTAuth = passport.authenticate('jwt', { session: false });

const FBAuth = {
  initalize: () => passport.authenticate('facebook'),
  callback: redirectUrl => passport.authenticate('facebook', { failureRedirect: redirectUrl }),
};

const GoogleAuth = {
  initalize: () => passport.authenticate('google', { scope: ['profile'] }),
  callback: redirectUrl => passport.authenticate('google', { failureRedirect: redirectUrl }),
};

function extractPayload(req, res, next) {
  if (typeof req.headers !== 'object') {
    return next();
  }
  res.token = req.headers['authorization'].split(' ')[1];
  res.payload = jwt.verify(res.token, jwtOptions.secretOrKey);
  next();
}

function signJWT(id, username) {
  return jwt.sign({ id, username }, jwtOptions.secretOrKey);
}

passport.use(new FbStrategy({
  clientID: process.env.FB_APP_ID,
  clientSecret: process.env.FB_APP_SECRET,
  callbackURL: 'http://localhost:4321/fb-auth-callback'
}, (accessToken, refreshToken, profile, cb) => {
  process.stdout.write('FB DETAILS', accessToken, refreshToken, profile);
  cb(null, profile);
  // Users.findById(payload.id, (err, user) => {
  //   if (err) return done(err)
  //   if (user) return done(null, user)
  // })
}));

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: 'http://localhost:4321/google-oauth-callback'
}, (accessToken, refreshToken, profile, cb) => {
  process.stdout.write('GOOGLE DETAILS', accessToken, refreshToken, profile);
  cb(null, profile);
  // Users.findById(payload.id, (err, user) => {
  //   if (err) return done(err)
  //   if (user) return done(null, user)
  // })
}));

passport.use(new JWTStrategy(jwtOptions, (payload, done) => {
  process.stdout.write(payload);
  Users.findById(payload.id, (err, user) => {
    if (err) return done(err);
    if (user) return done(null, user);
  });
}));

function hash(whatToHash) {
  let salt = bcrypt.genSaltSync(SALT_FACTOR);
  return bcrypt.hashSync(whatToHash, salt);
}

module.exports = (app) => {
  if (app) app.use(passport.initialize());
  return {
    jwtOptions,
    JWTAuth,
    FBAuth,
    GoogleAuth,
    hash,
    extractPayload,
    signJWT,
  };
};