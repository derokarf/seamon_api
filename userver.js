const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');

// const path = requery('path');

const app = express();

// app.use(express.favicon());
app.use(logger('dev'));
app.use(bodyParser.json());

const testTrack = require('./api/test_track');

app.use('/api/track', testTrack);

module.exports = app;
