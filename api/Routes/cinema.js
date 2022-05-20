const express = require('express');
const route = express.Router();
const cinemaService = require('../../Services/cinemaService')
const cinmeaMoviesService = require('../../Services/cinmeaMoviesService')
/***************Routes************/

route.post('/add',cinemaService.Add);
route.post('/delete',cinemaService.Delete);
route.get('/getall', cinemaService.getall);
route.post('/getOne', cinemaService.getOne);
//cinema Movie

route.post('/Movie/add',cinmeaMoviesService.Add);
route.post('/Movie/getOne',cinmeaMoviesService.getOne);
route.post('/Movie/Delete',cinmeaMoviesService.Delete);
route.post('/Movie/getByGenre',cinmeaMoviesService.getByGenre);


module.exports = route; 