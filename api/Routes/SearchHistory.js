const express = require('express');
const route = express.Router();
const searchHistoryServie = require('../../Services/searchHistoryServie')
/***************Routes************/

route.post('/add',searchHistoryServie.Add);

module.exports = route;