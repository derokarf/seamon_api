const express = require('express');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://test1.ru');
  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write('TEST connection');
  res.end();
});

module.exports = router;
