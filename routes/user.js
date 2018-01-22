const express = require('express')
const user = require('../controllers/user')
const { extractPayload, JWTAuth, FBAuth, GoogleAuth } = require('../utils/auth')()
const router = express.Router()

router.get("/", user.all)
router.get("/me", JWTAuth, extractPayload, user.verifyToken)
router.post("/login", user.login)
router.get("/login/fb", FBAuth)
router.get("/login/google", GoogleAuth)

router.post("/new", user.create)
router.post("/remove-all", user.removeAll)
router.post("/search", user.create)
router.post("/me", user.update)
router.get("/:user", user.getByUsername)

module.exports = router