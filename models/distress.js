const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const distressSchema = new Schema({
  title: String,
  description: String,
  images: [String],
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  approves: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }],
  location: {
    type: { name: String, points: [Number]}
  },
  ip: String,
  tags: [String],
  category: {
    type: String,
  },
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'Comment',
  }],
  disproves: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }],
  witnesses: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }],
}, { timestamps: true });

const Distress = mongoose.model('Distress', distressSchema);

module.exports = Distress;
