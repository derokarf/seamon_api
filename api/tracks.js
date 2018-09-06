const environment = (`${process.env.NODE_ENV}`).trim() || 'development';
const express = require('express');
const config = require('../db/knexfile.js')[environment];
const pg = require('knex')(config);
const dbLib = require('../db/lib/dbLib');
const sm_utils = require('../modules/sm_utils');
const czmlPackets = require('../modules/czml_packet');

const router = express.Router();
const tbRaces = 'races';
const tbBoats = 'boats';
const tbGadgets = 'gadgets';
const tbGPSList = 'gpslist';
const tbRaceConfig = 'race_config';

// загружает трек с одного устройства во временном интервале
// в формате CZML
router.post('/gettrack',(req, res) => {
  // Запрос id, name, begin, end, start, finish, about, location
  const idTracker = req.query.id;
  const dateStart = new Date(parseInt(req.query.start));
  const dateStop = new Date(parseInt(req.query.stop));
  // Загружаем все данные на текущий момент и отправляем клиенту
  pg.where('gadget', req.body.id)
  .andWhere('ttdd', '>=', req.body.start)
  .andWhere('ttdd', '<=', req.body.stop)
  .andWhere('isvalidgps', 'true')
  .select('ttdd','lat','lng','speed','course').table(tbGPSList)
  .then(result => {
    res.set({
      'Content-Type':'application/json'
    });
// Создаем массив точек позиционирования
let listPos = [];
    for (let i=0; i < result.length; i++) {
      listPos.push((result[i].ttdd - dateStart.getTime())/1000);
      listPos.push(sm_utils.latlng2deg(result[i].lng));
      listPos.push(sm_utils.latlng2deg(result[i].lat));
      listPos.push(2);
    }
    // Отправляем "document" пакет
    res.json(czmlPackets.getInitPacket());
    // Отправляем имеющиеся данные
    res.json(czmlPackets.getVehiclePacket( idTracker, dateStart, dateStop, listPos));
    res.status(200);
    res.end();
  })
  .catch(err => {
    res.status(400);
    console.error(err);
  });
});



module.exports = router;
