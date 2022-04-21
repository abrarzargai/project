const express = require('express');
const route = express.Router();
const UserServices = require('../../Services/userService')
/***************Routes************/

route.post('/signup',UserServices.SignUp);
route.post('/login',UserServices.Login);
route.patch('/updatepassword', UserServices.UpdatePassword);
route.put('/update', UserServices.update);
route.get('/getAll', UserServices.getall);
route.post('/getOne', UserServices.getOne);
route.delete('/delete', UserServices.delete);

module.exports = route;