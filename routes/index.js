const express = require('express')
const user = require('./user')
const distress = require('./distress')
const comment = require('./comment')

const router = express.Router()

router.use("/users", user)
router.use("/distress", distress)
router.use("/comments", comment)

module.exports = router