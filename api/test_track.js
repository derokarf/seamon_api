const express = require('express');
const bookshelf = require('../db/gpsDB');

const router = express.Router();
const Track = bookshelf.Model.extend({
  tableName: 'test1'
});

/* GET home page. */
router.get('/', (req, res) => {
  new Track().orderBy('ttdd', 'DESC').fetchAll().then(collection => {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    const simpleTrack = collection.toJSON();
    res.write(JSON.stringify(simpleTrack));
    res.end();
  });
});

module.exports = router;
