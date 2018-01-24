const mongoose = require('mongoose');

const Schema = mongoose.Schema;
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
  distress: [{
    type: Schema.Types.ObjectId,
    ref: 'Distress'
  }],
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'Comment'
  }]
}, { timestamps: true });

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;