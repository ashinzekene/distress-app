const express = require('express')
const distress = require('../controllers/distress')
const router = express.Router()

router.use("/", distress.all)
router.use("/new", distress.create)
router.use("/:distress", distress.getById)

module.exports = router