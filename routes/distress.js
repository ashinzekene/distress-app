const express = require('express');
const distress = require('../controllers/distress');
const router = express.Router();

router.get('/', distress.all);
router.post('/new', distress.create);
router.get('/search', distress.searchQuery);
router.post('/search', distress.search);
router.get('/:distress', distress.getById);
router.delete('/:distress', distress.deleteById);
router.post('/:distress/approve', distress.approve);
router.post('/:distress/dispprove', distress.disprove);

module.exports = router;