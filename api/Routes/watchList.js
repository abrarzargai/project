const express = require('express');
const route = express.Router();
const middleware = require('../Middleware/auth')
const watchListService = require('../../Services/watchListService')
/***************Routes************/

route.post('/add', middleware.authenticate, watchListService.Add);
route.delete('/delete',watchListService.Delete);
route.get('/getOneUserWatchList', middleware.authenticate, watchListService.getOneUserWatchList);

module.exports = route;