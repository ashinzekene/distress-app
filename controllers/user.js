const User = require('../models/user');
const { signJWT, hash } = require('../utils/auth')();

module.exports = {
  getByUsername(req, res) {
    User.findOne({ username: req.params.user }, '-password')
      .then(user => {
        if (!user) {
          return res.status(403).json({ err: 'Could not find any user' });
        }
        res.json(user);
      })
      .catch(() => {
        res.status(403).json({ err: 'An error occurred, could not retrieve user' });
      });
  },
  getByEmail(req, res) {
    User.findOne({ email: req.body.email }, '-password')
      .then(user => {
        if (!user) {
          return res.status(403).json({ err: 'Could not find any user' });
        }
        res.json(user);
      })
      .catch(() => {
        res.status(403).json({ err: 'An error occurred, could not retrieve user' });
      });
  },
  getById(req, res) {
    User.findById(req.params.user, '-password')
      .then(user => {
        if (!user) {
          return res.status(403).json({ err: 'Could not find any user' });
        }
        res.json(user);
      })
      .catch(() => {
        res.status(403).json({ err: 'An error occurred, could not retrieve user' });
      });
  },
  createSocial(req, res) {
    let { email, provider } = req.body;
    let user = Object.assign({}, req.body);
    if (provider == 'FACEBOOK') {
      user.facebookID = req.body.id;
    } else {
      user.googleID = req.body.id;
    }
    // console.log('FB ID', user.facebookID);
    // console.log('User', user);
    User.findOne({ email })
      .then(oldUser => {
        if (oldUser) {
          User.findByIdAndUpdate(oldUser._id, user)
            .then(newUser => {
              newUser = newUser.toJSON();
              delete newUser.password;
              newUser.token = signJWT(newUser._id, newUser.email);
              res.json(newUser);
            })
            .catch(err => {
              res.json({ err: 'An error occured. Could not update social a/c' });
            });
        } else {
          User.create(user)
            .then(newUser => {
              user = newUser.toJSON();
              delete newUser.password;
              newUser.token = signJWT(newUser._id, newUser.email);
              res.json(newUser);
            })
            .catch(err => {
              res.json({ err: 'An error occured. Could not create social a/c' });
            });
        }
      });
  },
  create(req, res) {
    let { username, email, firstname, lastname, bio, password } = req.body;
    let user = new User();
    user.username = username;
    user.password = hash(password);
    user.email = email;
    bio ? user.bio = bio : null;
    firstname ? user.firstname = firstname : null;
    lastname ? user.lastname = lastname : null;
    user.save()
      .then(user => {
        user = user.toJSON();
        delete user.password;
        user.token = signJWT(user._id, username);
        process.stdout.write(user.token);
        res.json(user);
      })
      .catch(err => {
        process.stdout.write(err);
        if (err.code === 11000) {
          return res.status(403).json({ result: 'You already have an account' });
        }
        res.status(403).json({ err: 'An error occurred, could not create account' });
      });
  },
  verifyToken(req, res) {
    return res.json(req.user);
  },
  login(req, res) {
    let { username, password, email } = req.body;
    User.findOne({ username, password }, '-password')
      .then(user => {
        if (!user) {
          return res.status(403).json({ result: 'Username or password is not correct' });
        }
        let userWithToken = Object.assign({}, user.toJSON(), { token: signJWT(user._id, user.username) });
        res.json(userWithToken);
      })
      .catch(() => {
        res.status(403).json({ err: 'An error occurred, could not retrieve your account' });
      });
  },
  update(req, res) {
    let { username, email, firstname, lastname, bio } = req.body;
    let user = {};
    username ? user.username = username : null;
    email ? user.email = email : null;
    bio ? user.bio = bio : null;
    firstname ? user.firstname = firstname : null;
    lastname ? user.lastname = lastname : null;
    User.findByIdAndUpdate(req.user.id, user, { new: true })
      .select('-password')
      .then(user => {
        res.json(user);
      })
      .catch(() => {
        res.status(403).json({ err: 'An error occurred, could not update account' });
      });
  },
  all(req, res) {
    User.find()
      .then(users => {
        res.json(users);
      })
      .catch(() => {
        res.status(501).json({ err: 'Could not retieve all users' });
      });
  },
  removeAll(req, res) {
    User.remove()
      .then(users => {
        res.json(users);
      })
      .catch(() => {
        res.status(403).json({ err: 'Could not reomve all users' });
      });
  }
};
