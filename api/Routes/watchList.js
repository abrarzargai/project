const express = require('express');
const route = express.Router();
const watchListService = require('../../Services/watchListService')
const middleware = require('../Middleware/auth');
/***************Routes************/

route.post('/add', middleware.authenticate, watchListService.Add);
route.delete('/delete', middleware.authenticate, watchListService.Delete);
route.get('/getOneUserWatchList', middleware.authenticate, watchListService.getOneUserWatchList);

module.exports = route;