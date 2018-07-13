const environment = (`${process.env.NODE_ENV}`).trim() || 'development';
const express = require('express');
const config = require('../db/knexfile.js')[environment];
const pg = require('knex')(config);
const dbLib = require('../db/lib/dbLib');

const router = express.Router();
const tbRaces = 'races';
const tbBoats = 'boats';
const tbGadgets = 'gadgets';
const tbRaceConfig = 'race_config';

// Записывает новую гонку в базу.
router.post('/add',(req, res, next) => {
  const dataRace = req.body;
  // Делаем запись о гонке.
  pg(tbRaces).insert({
    name: dataRace.raceName,
    begin: dataRace.raceBegin,
    end: dataRace.raceEnd,
    start: dataRace.raceStart,
    finish: dataRace.raceFinish,
    location: dataRace.raceLocation,
    about: dataRace.raceAbout
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

// Записывает нового участника гонки в базу
router.post('/addConfig',(req, res, next) => {
  const dataRace = req.body;
  console.log(dataRace);
  // Запись в базу
  pg(tbRaceConfig).insert({
    id_race: dataRace.raceConfigIdRace,
    id_boat: dataRace.raceConfigBoat,
    id_gadget: dataRace.raceConfigGadget,
    id_status: dataRace.raceConfigStatus,
    about: dataRace.raceConfigAbout
  })
  .then(result => {
    res.status(200);
    res.end();
  })
  .catch(err => {
    res.status(400);
    console.error(err);
  });
})

// Загружает данные всех гонок.
router.get('/getall',(req, res, next) => {
  // Запрос id, name, begin, end, start, finish, about, location
  pg.select('id', 'name', 'begin', 'end', 'start', 'finish', 'location', 'about').table(tbRaces)
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

// загружает параметры одно гонки
router.post('/getone',(req, res) => {
  // Запрос id, name, begin, end, start, finish, about, location
  pg.where('id', req.body.idrow)
  .select('name', 'begin', 'end', 'start', 'finish', 'location', 'about').table(tbRaces)
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

// Загружает конфигурацию гонки
// race_config.id_status повторен дважды т.к. на данный момент таблица
// boat_status отсутствует
router.post('/getconfig', (req,res,next) => {
  pg.where(pg.raw('(race_config.id_race = ?) AND ' +
  '(race_config.id_race = races.id) AND (race_config.id_boat = boats.id) AND ' +
  '(race_config.id_gadget = gadgets.id)', req.body.idrow))
  .select(pg.raw('race_config.id as id, boats.name as boat, boats.id as' +
  ' boat_id, gadgets.name as gadget, gadgets.id as gadget_id, ' +
  'race_config.id_status as status, race_config.id_status as status_id,' +
  ' race_config.about as about'))
  .from(pg.raw(`${tbRaceConfig}, ${tbBoats}, ${tbRaces}, ${tbGadgets}`))
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
  })
});

// Загружает участников гонки в виде связок {id_boat, id_tracker, id_status, about}
router.post('/getmembers', (req,res) => {
  pg.where(pg.raw('(race_config.id_race = ?) AND ' +
  '(race_config.id_race = races.id) AND (race_config.id_boat = boats.id) AND ' +
  '(race_config.id_gadget = gadgets.id)', req.body.idrace))
  .select(pg.raw('boats.id as boat_id, boats.name as boat_name, gadgets.id as gadget_id, ' +
  'race_config.id_status as status_id, race_config.about as about'))
  .from(pg.raw(`${tbRaceConfig}, ${tbBoats}, ${tbRaces}, ${tbGadgets}`))
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
  })
});


// Загружает список учавствующих лодок
router.post('/getboats', (req,res,next) => {
  pg.select(pg.raw('boats.id, boats.name, boats.type, ' +
  'boats.about, race_config.id_race'))
  .from(pg.raw(`${tbBoats}`))
  .leftOuterJoin(pg.raw('race_config ON (race_config.id_race = ?)' +
  ' AND  (race_config.id_boat = boats.id)', req.body.idrace))
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
  })
});
// Загружает список учавствующих трекеров
router.post('/getgadgets', (req,res,next) => {
  pg.select(pg.raw('gadgets.id, gadgets.name, gadgets.imei, gadgets.phone,' +
   ' gadgets.type, gadgets.about, race_config.id_race'))
  .from(pg.raw('gadgets'))
  .leftOuterJoin(pg.raw('race_config ON (race_config.id_race = ?)' +
  ' AND  (race_config.id_gadget = gadgets.id)', req.body.idrace))
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
  })
});
// Загружает данные одной гонки.
router.get('/getone',(req, res, next) => {
  console.log(req.body);
});

// Удаляет гонку
router.post('/remove',(req, res, next) => {
  dbLib.remove(pg, tbRaces, req.body.idrow, res);
});

// Удаляет гонку
router.post('/removeConfig',(req, res, next) => {
  pg(tbRaceConfig).where('id',req.body.idrow).del()
  .then(result => {
    res.status(200);
    res.end();
  })
  .catch(err => {
    console.error(err);
  });
});

module.exports = router;
