var mongoose = require('mongoose');
var gracefulShutdown;
var dbURI = process.env.MONGO_URL || 'mongodb://127.0.0.1/distressapp';

mongoose.connect(dbURI, (err) => {
  if (err) {
    process.stdout.write('Couldn\'t connect to DB');
  }
});

// CONNECTION EVENTS
mongoose.connection.on('connected', function () {
  process.stdout.write('Mongoose connected to ' + dbURI);
});
mongoose.connection.on('error', function (err) {
  process.stdout.write('Mongoose connection error: ' + err);
});
mongoose.connection.on('disconnected', function () {
  process.stdout.write('Mongoose disconnected');
});

// CAPTURE APP TERMINATION / RESTART EVENTS
// To be called when process is restarted or terminated
gracefulShutdown = function (msg, callback) {
  mongoose.connection.close(function () {
    process.stdout.write('Mongoose disconnected through ' + msg);
    callback();
  });
};
// For nodemon restarts
process.once('SIGUSR2', function () {
  gracefulShutdown('nodemon restart', function () {
    process.kill(process.pid, 'SIGUSR2');
  });
});
// For app termination
process.on('SIGINT', function () {
  gracefulShutdown('app termination', function () {
    process.exit(0);
  });
});
// For Heroku app termination
process.on('set', function () {
  gracefulShutdown('Heroku app termination', function () {
    process.exit(0);
  });
});
