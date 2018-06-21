const environment = (`${process.env.NODE_ENV}`).trim() || 'development';
const express = require('express');
const config = require('../db/knexfile.js')[environment];
const pg = require('knex')(config);

const router = express.Router();
const table = 'gadgets';

// Записывает новый трекер в базу.
router.post('/add',(req, res, next) => {
  const dataGadget = req.body;
  // Запрос {id, imei, phone, name, about, type}
  pg(table).insert({
    name: dataGadget.gadgetName,
    type: dataGadget.gadgetType,
    about: dataGadget.gadgetAbout,
    imei: dataGadget.gadgetIMEI,
    phone: dataGadget.gadgetPhone
  })
  .then(result => {
    res.status(200);
    res.end();
  })
  .catch(err => {
    res.status(400);
    console.error(err);
  });
});

// Загружает данные всех трекеров.
router.get('/getall',(req, res, next) => {
  // Запрос {id, imei, phone, name, about, type}
  pg.select('id', 'imei', 'phone', 'name', 'type', 'about').table(table)
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

// Загружает данные одного трекера
router.get('/getone',(req, res, next) => {
  console.log(req.body);
});

// Удаляет трекер
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
