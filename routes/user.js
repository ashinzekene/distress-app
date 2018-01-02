const express = require('express')
const user = require('../controllers/user')
const router = express.Router()

router.get("/", user.getById)
router.post("/new", user.create)
router.post("/update", user.update)

module.exports = router