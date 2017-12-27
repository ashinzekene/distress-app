const mongoose = require('mongoose')

const Schema = mongoose.Schema
const commentSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  text: String,
  likes: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  comments: [{
    type: Schema.Types.ObjectId
  }]
})

const Comment = mongoose.model("Comment", commentSchema)

module.exports = Comment