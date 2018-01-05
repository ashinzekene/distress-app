const express = require('express')
const distress = require('../controllers/distress')
const router = express.Router()

router.get("/", distress.all)
router.post("/new", distress.create)
router.get("/search", distress.searchQuery)
router.post("/search", distress.search)
router.post("/category/:category", distress.search)
router.get("/:distress", distress.getById)
router.get("/:distress/approve", distress.approve)

module.exports = router