const express = require('express');
const distress = require('../controllers/distress');
const multer = require('multer');

const upload = multer({ dest: 'uploads' })
// const images = require('../controllers/image');
const router = express.Router();

router.get('/', distress.all);
router.post('/new', distress.create);
router.post('/imgs', upload.any(), function (req, res) {
  // console.log('Files', req.files);
  // console.log('Body', req.body);
  console.log("Files", req.file);
  res.json({ file: req.file && req.file.filename, body: req.body });
});
router.get('/search', distress.searchQuery);
router.post('/search', distress.search);
router.get('/:distress', distress.getById);
router.delete('/:distress', distress.deleteById);
router.post('/:distress/approve', distress.approve);
router.post('/:distress/dispprove', distress.disprove);

module.exports = router;