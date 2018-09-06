const environment = (`${process.env.NODE_ENV}`).trim() || 'development';
const express = require('express');
const config = require('../db/knexfile.js')[environment];
const pg = require('knex')(config);
const cors = require('cors');
const sseExpress = require('sse-express');

const router = express.Router();

// Загружает данные всех лодок.
let corsOptions = {
  origin: 'http://localhost:8080',
  credentials: true
}

router.get('/point', cors(corsOptions), sseExpress, (req, res) => {
  res.sse('connected', {
    welcomeMsg: 'Hello!'
  });
  let i = 0;
  let initPacket = {
                    "id" : "document",
                    "name" : "CZML Geometries",
                    "version" : "1.0"
                  };
  res.sse('czml', initPacket);

  let timer = setInterval(write, 20000);
  let dd = [];
  dd.push([100, -80, 44, 150000]);
  dd.push([200, -90, 18, 150000]);
  dd.push([300, -98, 52, 150000]);
  dd.push([0,   -70, 20, 150000]);

  function write() {
    if(i >= 4){
      clearTimeout(timer);
      return;
    }
    let czml =  { "id" : "point",
                  "availability" :"2012-08-04T16:00:00Z/2012-08-04T16:05:00Z",
                  "position" : {
                    "epoch" : "2012-08-04T16:00:00Z"
                  },
                  "point": {
                      "color": {
                          "rgba": [255, 255, 255, 255]
                      },
                      "outlineColor": {
                          "rgba": [255, 0, 0, 255]
                      },
                      "outlineWidth" : 4,
                      "pixelSize": 20
                  }
                };
                czml.position.cartographicDegrees = dd[i];
                i++;
                console.log(i);
    res.sse('czml', czml);
  }
});

module.exports = router;
