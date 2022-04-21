const express = require('express');
const route = express.Router();
const watchListService = require('../../Services/watchListService')
/***************Routes************/

route.post('/add',watchListService.Add);
route.delete('/delete',watchListService.Delete);
route.post('/getOneUserWatchList',watchListService.getOneUserWatchList);

module.exports = route;