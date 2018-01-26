require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const routes = require('./routes/index');
mongoose.Promise = require('bluebird');
const app = express();
const fileUpload = require('express-fileupload');
const port = process.env.PORT || 4321;
const isProduction = process.env.NODE_ENV === 'production';

require('./utils/mongoose');
require('./utils/auth')(app);

app.use(fileUpload())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post('api/upload' ,(req, res) => {
  console.log(req.file);
  if (!req.files) {
    res.json({ res: 'No files uploaded'});
    return;
  }
  res.json({ res: 'Yay!!! Worked'});
});
if (!isProduction) {
  process.stdout.write('Not in production');
  app.use((req, res, next) => {
    process.stdout.write(`\n${req.method.toUpperCase()}: ${req.url}`);
    next();
  });
  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Method', 'GET,POST,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-type,Authorization');
    next();
  });
}
app.use(express.static(path.join(__dirname, 'dist')));
app.options('*', (req, res) => {
  res.json({ res: 'pre-flight' });
});
app.use('/api', routes);
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname + '/dist/index.html'));
});

app.listen(port, err => {
  if (err) {
    return process.stdout.write('An error occurred');
  }
  process.stdout.write(`Server running on port ${port}`);
});
