const mongoose = require("mongoose")
const Schema = mongoose.Schema

const distressSchema = new Schema({
  title: String,
  description: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  supports: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }],
  location: String,
  ip: String,
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'Comment',
  }],
  disproves: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }],
})

const Distress = mongoose.model('Distress', distressSchema)

module.exports = Distress
