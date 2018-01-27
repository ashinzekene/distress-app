const Comment = require('../models/comment');
const User = require('../models/user');

module.exports = {
  getById(req, res) {
    User.findById(req.params.comment)
      .then(comment => {
        if (!comment) {
          return res.status(403).json({ err: 'No comment found' });
        }
        res.json(comment);
      });
  },
  create(req, res) {
    let { distress, user, text } = req.body;
    if (!req.body.distress) {
      res.status(403).json({ err: 'Could not create comment, no distress' });
    }
    Comment.create({ user, text, distress })
      .then(comment => {
        res.json(comment);
      })
      .catch(() => {
        res.status(403).json({ err: 'Could not create comment' });
      });
  },
  all(req, res) {
    let { skip, limit } = req.params;
    Comment.find()
      .limit(limit > 20 ? 20 : limit)
      .skip(skip || 0)
      .then(comments => {
        res.json(comments);
      })
      .catch(() => {
        res.status(403).json({ err: 'Could not fetch all comments' });
      });
  },
  search(req, res) {
    let comment = {};
    let { user, text, distress, limit, offset } = req.body;
    comment.user = user;
    comment.text = text;
    comment.distress = distress;
    Comment.find(comment)
      .limit(limit)
      .skip(offset)
      .then(comments => {
        res.json(comments);
      })
      .catch(() => {
        res.status(403).json({ err: 'An error occurred, could not search distrsses' });
      });
  },
  distressComments(req, res) {
    Comment.find({ distress: req.params.distress })
      .populate('user', 'firstName lastName email')
      .then(comment => {
        res.json(comment);
      })
      .catch(() => {
        res.status(403).json({ err: 'Could not fetch all comments for this distress' });
      });
  },
  commentComments(req, res) {
    Comment.find({ comment: req.params.distress })
      .then(comment => {
        res.json(comment);
      })
      .catch(() => {
        res.status(403).json({ err: 'Could not fetch all comments for this comment' });
      });
  }
};