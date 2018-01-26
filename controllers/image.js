const multer = require('multer');
const cloudinary = require('cloudinary');

cloudinary.config({
  cloud_name: 'sample', 
  api_key: '874837483274837', 
  api_secret: 'a676b67565c6767a6767d6767f676fe1' 
});

function fileFilter(req, file, cb) {
  return file.mimetype.indexOf('image') > -1 ? cb(null, true) : cb(null, false);
}
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  }
});
const upload = multer({ storage, fileFilter });

module.exports = {
  images: field => upload.array(field, 5),
  image: field => upload.single(field),
  upload: () => {
    cloudinary.uploader.upload();
  }
};

