const express = require('express')
const user = require('../controllers/user')
const { extractPayload, requireAuth } = require('../utils/auth')()
const router = express.Router()

router.get("/", user.all)
router.get("/me", requireAuth, extractPayload, user.verifyToken)
router.post("/login", user.login)
router.post("/new", user.create)
router.post("/remove-all", user.removeAll)
router.post("/search", user.create)
router.post("/me", user.update)
router.get("/:user", user.getByUsername)

module.exports = router