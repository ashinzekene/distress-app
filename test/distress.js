const mongoose = require('mongoose');
const chai = require('chai');
const Distress = require('../models/distress');
const expect = chai.expect;
// Create a new schema that accepts a 'name' object.
// 'name' is a required field

//Create a new collection called 'Name'
describe('Distress tests', function() {
  //Before starting the test, create a sandboxed database connection
  //Once a connection is established invoke done()
  before(function (done) {
    mongoose.connect('mongodb://localhost/testDatabase');
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error'));
    db.once('open', function() {
      console.log('We are connected to test database!');
      done();
    });
  });
  describe('Test Database', function() {
    //Save object with 'name' value of 'Mike"
    it('New name saved to test database', function(done) {
      var testName = Name({
        name: 'Mike'
      });
 
      testName.save(done);
    });
    it('Dont save incorrect format to database', function(done) {
      //Attempt to save with wrong info. An error should trigger
      var wrongSave = Name({
        notName: 'Not Mike'
      });
      wrongSave.save(err => {
        if(err) { return done(); }
        throw new Error('Should generate error!');
      });
    });