const environment = (`${process.env.NODE_ENV}`).trim() || 'development';
const express = require('express');
const config = require('../db/knexfile.js')[environment];
const pg = require('knex')(config);
const dbLib = require('../db/lib/dbLib');

const router = express.Router();
const tbRaces = 'races';
const tbBoats = 'boats';
const tbGadgets = 'gadgets';
const tbGPSList = 'gpslist';
const tbRaceConfig = 'race_config';

// загружает трек с одного устройства во временном интервале
router.post('/gettrack',(req, res) => {
  // Запрос id, name, begin, end, start, finish, about, location
  pg.where('gadget', req.body.id)
  .andWhere('ttdd', '>=', req.body.start)
  .andWhere('ttdd', '<=', req.body.stop)
  .andWhere('isvalidgps', 'true')
  .select('ttdd','lat','lng','speed','course').table(tbGPSList)
  .then(result => {
    res.set({
      'Content-Type':'application/json'
    });
    res.json(result);
    res.status(200);
    res.end();
  })
  .catch(err => {
    res.status(400);
    console.error(err);
  });
});

module.exports = router;
