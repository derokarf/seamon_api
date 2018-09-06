const environment = (`${process.env.NODE_ENV}`).trim() || 'development';
const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const bodyParser = require('body-parser');

// const path = requery('path');

const app = express();

let corsOptions = {
  origin: 'http://localhost:8080',
  credentials: true
}

app.use(cors(corsOptions));
// app.use(express.favicon());
app.use(logger('dev'));
app.use(bodyParser.json());

app.options("/*", cors());

const boats = require('./api/boats');
const gadgets = require('./api/gadgets');
const races = require('./api/races');
const tracks = require('./api/tracks');
const test = require('./api/test');

app.use('/api/boats', boats);
app.use('/api/gadgets', gadgets);
app.use('/api/races', races);
app.use('/api/tracks', tracks);
app.use('/api/test', test);


module.exports = app;
