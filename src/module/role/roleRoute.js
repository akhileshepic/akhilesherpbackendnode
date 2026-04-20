const Router = require('express').Router(); 
const {createRole } = require('./roleController');
Router.post('/create', createRole);
module.exports = Router;