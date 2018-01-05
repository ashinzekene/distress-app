const express = require('express')
const comment = require('../controllers/comment')
const router = express.Router()

router.get('/', comment.all)
router.post('/new', comment.create)
router.post('/search', comment.create)
router.get('/:comment', comment.getById)
router.get('/:distress/comments', comment.distressComments)
router.get('/:comment/comments', comment.commentComments)

module.exports = router