const Distress = require('../models/distress')

module.exports = {
  getById(req, res) {
    Distress.findById(req.params.distress)
      .then(distress => {
        if (!distress) {
          res.status(403).json({ err: "Distress not found" })
        }
        res.json(distress)
      })
      .catch(err => {
        res.status(403).json({ err: "An error occurred, could not retrieve distress" })
      })
  },
  create(req, res) {
    Distress.create(req.body)
      .then(distress => {
        res.json(distress)
      })
      .catch(err => {
        res.status(403).json({ err: "An error occurred, could not create distress" })
      })
  },
  all(req, res) {
    Distress.find()
      .then(distresses => {
        res.json(distresses)
      })
      .catch(err => {
        res.status(403).json({ err: "An error occurred, could not fetch distrsses" })
      })
  },
  approve(req, res) {
    Distress.findByIdAndUpdate(req.params.distress, { $addToSet: { approves: req.user._id } }, { new: true})
      .then(distress => {
        re.json(distress)
      })
      .catch(err => {
        res.status(403).json({ err: "An error occured wgile apprroving distress" })
      })
  },
  disprove(req, res) {
    Distress.findByIdAndUpdate(req.params.distress, { $addToSet: { disproves: req.user._id } }, { new: true})
      .then(distress => {
        re.json(distress)
      })
      .catch(err => {
        res.status(403).json({ err: "An error occured wgile apprroving distress" })
      })
  }
}