const express = require('express')
const user = require('./user')
const distress = require('./distress')
const comment = require('./comment')

const router = express.Router()

router.use("/user", user)
router.use("/distress", distress)
router.use("/comment", comment)

module.exports = router