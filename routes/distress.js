const express = require('express');
const distress = require('../controllers/distress');
const images = require('../controllers/image');
const router = express.Router();

router.get('/', distress.all);
router.post('/new', distress.create);
router.post('/imgs', images.images('images'), function (req, res) {
  // console.log('Files', req.files);
  // console.log('Body', req.body);
  res.json(req.body);
});
router.get('/search', distress.searchQuery);
router.post('/search', distress.search);
router.get('/:distress', distress.getById);
router.delete('/:distress', distress.deleteById);
router.post('/:distress/approve', distress.approve);
router.post('/:distress/dispprove', distress.disprove);

module.exports = router;