const express = require('express');
const user = require('../controllers/user');
const { extractPayload, JWTAuth, GoogleAuth } = require('../utils/auth')();
const router = express.Router();

router.get('/', user.all);
router.get('/me', JWTAuth, extractPayload, user.verifyToken);
router.post('/login', user.login);
router.post('/email', user.getByEmail);
router.post('/social', user.socialSignin);
router.get('/login/google', GoogleAuth.initalize());

router.get('/google-oauth-callback', (req, res) => {
  res.json(req.user);
});
router.get('/fb-auth-callback', (req, res) => {
  res.json(req.user);
});

router.post('/new', user.create);
router.post('/remove-all', user.removeAll);
router.post('/search', user.create);
router.post('/me', user.update);
router.get('/:user', user.getByUsername);

module.exports = router;