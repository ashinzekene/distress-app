const express = require('express');
const comment = require('../controllers/comment');
const router = express.Router();

router.get('/', comment.all);
router.get('/length', comment.length);
router.post('/new', comment.create);
router.post('/search', comment.search);
router.get('/:comment', comment.getById);
router.get('/:distress/comments', comment.distressComments);
router.get('/:comment/comments', comment.commentComments);

module.exports = router;