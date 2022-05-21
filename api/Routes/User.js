const express = require('express');
const route = express.Router();
const UserServices = require('../../Services/userService')
const middleware = require('../Middleware/auth');
/***************Routes************/

route.post('/signup', UserServices.SignUp);
route.post('/login', UserServices.Login);
route.patch('/updatepassword', middleware.authenticate, UserServices.UpdatePassword);
route.put('/update', middleware.authenticate, UserServices.update);
route.get('/getAll', UserServices.getall);
route.get('/getOne', middleware.authenticate, UserServices.getOne);
route.delete('/delete', UserServices.delete);

module.exports = route;