const express = require('express')
const user = require('../controllers/user')
const router = express.Router()

router.get("/", user.all)
router.post("/new", user.create)
router.post("/search", user.create)
router.post("/me", user.update)
router.get("/:user", user.getByUsername)

module.exports = router