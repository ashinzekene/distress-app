require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const routes = require('./routes/index');
mongoose.Promise = require('bluebird');
const app = express();
const port = process.env.PORT || 4321;
const isProduction = process.env.NODE_ENV === 'production';

require('./utils/mongoose');
require('./utils/auth')(app);

app.use(bodyParser.json({limit: '6mb'}));
app.use(bodyParser.urlencoded({ extended: true, limit: '6mb' }));

if(!isProduction) {
  process.stdout.write('Not in production');
  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Method', 'GET,POST,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-type,Authorization');
    next();
  });
}
app.use(express.static(path.join(__dirname, 'dist')));
app.options('*', (req, res) =>{
  res.json({ res: 'pre-flight' });
});
app.use('/api', routes);
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname + '/dist/index.html'));
});

app.listen(port, err => {
  if (err) {
    return process.stdout.write('An error occurred');
  }
  process.stdout.write(`Server running on port ${port}`);
});
