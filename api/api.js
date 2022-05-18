const express = require('express');
const router = express.Router();

//Required api's 
const User = require('./Routes/User')
const Auth = require('./Routes/Auth')
const Scraping = require('./Routes/scraping')
const WatchList = require('./Routes/watchList')



/*********Main Api**********/
router.use('/user',User);
router.use('/auth', Auth);
router.use('/scraping', Scraping);
router.use('/watchlist', WatchList);



module.exports = router;