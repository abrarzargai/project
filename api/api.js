const express = require('express');
const router = express.Router();

//Required api's 
const User = require('./Routes/User')
const Auth = require('./Routes/Auth')
const watchList = require('./Routes/watchList')
const SearchHistory = require('./Routes/SearchHistory')
const scraping = require('./Routes/scraping')



/*********Main Api**********/
router.use('/user',User);
router.use('/auth', Auth);
router.use('/watchList', watchList);
router.use('/scraping', scraping);



module.exports = router;