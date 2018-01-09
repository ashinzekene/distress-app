const mongoose = require("mongoose")
const Schema = mongoose.Schema
const { categories } = require('../utils/constants')

const distressSchema = new Schema({
  title: String,
  description: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  approves: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }],
  location: String,
  ip: String,
  tags: [String],
  category: {
    type: String,
    enum: categories
  },
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'Comment',
  }],
  disproves: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }],
}, { timestamps: true })

const Distress = mongoose.model('Distress', distressSchema)

module.exports = Distress
