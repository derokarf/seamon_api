const express = require('express');
const bookshelf = require('../db/gpsDB');

const router = express.Router();
const Track = bookshelf.Model.extend({
  tableName: 'race_gps_test'
});

/* GET home page. */
router.get('/', (req, res) => {
  new Track().orderBy('ttdd', 'DESC').fetchAll().then(collection => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.writeHead(200, { 'Content-Type': 'application/json' });
    const simpleTrack = collection.toJSON();
    res.write(JSON.stringify(simpleTrack));
    res.end();
  });
});

module.exports = router;
