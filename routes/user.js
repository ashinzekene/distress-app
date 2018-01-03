const express = require('express')
const user = require('../controllers/user')
const router = express.Router()

router.get("/", user.all)
router.post("/new", user.create)
router.post("/", user.update)
router.post("/:user", user.getByUsername)

module.exports = router