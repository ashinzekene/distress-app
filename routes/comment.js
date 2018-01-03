const express = require('express')
const comment = require('../controllers/comment')
const router = express.Router()

router.get('/', comment.all)
router.post('/new', comment.create)
router.get('/:comment', comment.getById)

module.exports = router