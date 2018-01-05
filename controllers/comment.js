const Comment = require('../models/comment')

module.exports = {
  getById(req,res) {
    Comment.findById(req.params.comment)
      .then(comment => {
        if (!comment) {
          return res.status(403).json({ err: "No comment found" })
        }
        res.json(comment)
      })
  },
  create(req, res) {
    if (!req.body.distress) {
      res.status(403).json({ err: 'Could not create comment, no distress' })      
    } 
    Comment.create(req.body)
      .then(comment => {
        res.json(comment)
      })
      .catch(err => {
        res.status(501).json({ err: 'Could not create comment' })        
      })
  },
  all(req, res) {
    Comment.find()
      .then(comments => {
        res.json(comments)
      })
      .catch(err => {
        res.status(501).json({ err: 'Could not fetch all comments' })
      })
  },
  search(req, res) {
    let comment= {}
    let { user, text, distress } = req.body 
    comment.user = user
    comment.text = text
    comment.distress = distress
    Comment.find(comment)
      .limit(limit)
      .skip(offset)
      .then(comments => {
        res.json(comments)
      })
      .catch(err => {
        res.status(403).json({ err: "An error occurred, could not search distrsses" })
      })
  },
  distressComments(req, res) {
    Comment.find({ distress: req.params.distress })
      .then(comment => {
        res.json(comment)
      })
      .catch(err => {
        res.status(501).json({ err: 'Could not fetch all comments for this distress' })        
      })
  },
  commentComments(req, res) {
    Comment.find({ comment: req.params.distress })
      .then(comment => {
        res.json(comment)
      })
      .catch(err => {
        res.status(501).json({ err: 'Could not fetch all comments for this comment' })        
      })
  }
}