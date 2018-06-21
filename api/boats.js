const environment = (`${process.env.NODE_ENV}`).trim() || 'development';
const express = require('express');
const config = require('../db/knexfile.js')[environment];
const pg = require('knex')(config);

const router = express.Router();
const table = 'boats';

// Записывает новую лодку в базу.
router.post('/add',(req, res, next) => {
  const dataBoat = req.body;
  pg(table).insert({name: dataBoat.boatName, type: dataBoat.boatType, about: dataBoat.boatAbout})
  .then(result => {
    res.status(200);
    res.end();
  })
  .catch(err => {
    res.status(400);
    console.error(err);
  });
});

// Загружает данные всех лодок.
router.get('/getall',(req, res, next) => {
  pg.select('id','name','type','about').table(table)
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

// Загружает данные одной лодки.
router.get('/getone',(req, res, next) => {
  console.log(req.body);
});

// Удаляет лодку
router.post('/remove',(req, res, next) => {
  pg('boats').where('id',req.body.idrow).del()
  .then(result => {
    res.status(200);
    res.end();
  })
  .catch(err => {
    console.error(err);
  });
});

module.exports = router;
