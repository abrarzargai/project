const express = require('express');
const router = express.Router();

//Required api's 
const User = require('./Routes/User')
const Auth = require('./Routes/Auth')



/*********Main Api**********/
router.use('/user',User);
router.use('/auth', Auth);



module.exports = router;