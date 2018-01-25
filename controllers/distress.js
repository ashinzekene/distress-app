const Distress = require('../models/distress');

module.exports = {
  getById(req, res) {
    Distress.findById(req.params.distress)
      .then(distress => {
        if (!distress) {
          res.status(403).json({ err: 'Distress not found' });
        }
        res.json(distress);
      })
      .catch(err => {
        process.stdout.write(err);
        res.status(403).json({ err: 'An error occurred, could not retrieve distress' });
      });
  },
  create(req, res) {
    const { title, description, category, tags } = req.body;
    let distress= {};  
    distress.title = title;
    distress.description = description;
    distress.category = category;
    distress.tags = tags;
    distress.ip = req.ip;
    process.stdout.write('creating distress', distress);
    Distress.create(distress)
      .then(distress => {
        res.json(distress);
      })
      .catch(err => {
        process.stdout.write(err);
        res.status(403).json({ err: 'An error occurred, could not create distress' });
      });
  },
  all(req, res) {
    Distress.find()
      .limit(20)
      .then(distresses => {
        res.json(distresses);
      })
      .catch(err => {
        process.stdout.write(err);
        res.status(403).json({ err: 'An error occurred, could not fetch distrsses' });
      });
  },
  searchQuery(req, res) {
    let distress= {};
    let { title, author, location, category, limit, offset, sort } = req.query; 
    title ? distress.title = title : null;
    author ? distress.author = author : null;
    location ? distress.location = location : null;
    category ? distress.category = category : null;
    limit = limit > 50 ? 20 : limit;
    offset = offset ? offset : 0;
    Distress.find(distress)
      .limit(limit)
      .skip(offset)
      .sort(sort)
      .then(distresses => {
        res.json(distresses);
      })
      .catch(err => {
        process.stdout.write(JSON.stringify(err));
        res.status(403).json({ err: 'An error occurred, could not search distrsses' });
      });
  },
  search(req, res) {
    let distress= {};
    let { title, author, location, category, sort, limit, offset } = req.body; 
    title ? distress.title = RegExp(title, 'i') : null;
    author ? distress.author = author : null;
    location ? distress.location = location : null;
    category ? distress.category = category : null;
    limit = limit > 20 ? 20 : limit;
    offset = offset ? offset : 0;
    Distress.find(distress)
      .limit(limit)
      .skip(offset)
      .sort(sort)
      .then(distresses => {
        res.json(distresses);
      })
      .catch(err => {
        process.stdout.write(err);
        res.status(403).json({ err: 'An error occurred, could not search distrsses' });
      });
  },
  deleteById(req, res) {
    Distress.findByIdAndRemove(req.params.distress)
      .then(distress => {
        res.json(distress);
      })
      .catch(err => {
        process.stdout.write(err);
        process.stdout.write(err);
        res.status(403).json({err: 'Could not delete Distress' });
      });
  },
  approve(req, res) {
    Distress.findByIdAndUpdate(req.params.distress, { $addToSet: { approves: req.user._id } }, { new: true})
      .then(distress => {
        res.json(distress);
      })
      .catch(err => {
        process.stdout.write(err);
        res.status(403).json({ err: 'An error occured while apprroving distress' });
      });
  },
  disprove(req, res) {
    Distress.findByIdAndUpdate(req.params.distress, { $addToSet: { disproves: req.user._id } }, { new: true})
      .then(distress => {
        res.json(distress);
      })
      .catch(err => {
        process.stdout.write(err);
        res.status(403).json({ err: 'An error occured while disproving distress' });
      });
  },
  category(req, res) {
    let { category } = req.params;
    Distress.find({ category })
      .limit(20)
      .then(distresses => {
        res.json(distresses);
      })
      .catch(err => {
        process.stdout.write(err);
        res.status(403).json({ err: 'An error occured while fetching distresses for that category' });        
      });
  }
};