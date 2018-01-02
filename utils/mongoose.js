var mongoose = require('mongoose');
var gracefulShutdown;
// var dbURI = "mongodb://127.0.0.1/vdc"
var dbURI = process.env.MONGO_URL

mongoose.connect(dbURI, {useMongoClient: true}, (err) => {
  if (err) {
    console.log("Couldn't connect to DB. Falling back to local mongo");
    mongoose.connect("mongodb://127.0.0.1/vdc", { useMongoClient: true });
  }
});

// CONNECTION EVENTS
mongoose.connection.on('connected', function() {
  console.log('Mongoose connected to ' + dbURI);
});
mongoose.connection.on('error', function(err) {
  console.log('Mongoose connection error: ' + err);
});
mongoose.connection.on('disconnected', function() {
  console.log('Mongoose disconnected');
});

// CAPTURE APP TERMINATION / RESTART EVENTS
// To be called when process is restarted or terminated
gracefulShutdown = function(msg, callback) {
  mongoose.connection.close(function() {
    console.log('Mongoose disconnected through ' + msg);
    callback();
  });
};
// For nodemon restarts
process.once('SIGUSR2', function() {
  gracefulShutdown('nodemon restart', function() {
    process.kill(process.pid, 'SIGUSR2');
  });
});
// For app termination
process.on('SIGINT', function() {
  gracefulShutdown('app termination', function() {
    process.exit(0);
  });
});
// For Heroku app termination
process.on('set', function() {
  gracefulShutdown('Heroku app termination', function() {
    process.exit(0);
  });
});
