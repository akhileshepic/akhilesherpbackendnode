const Router = require('express').Router(); 
const {createRole,getAllRoles } = require('./roleController');
Router.post('/create', createRole);
Router.get('/all', getAllRoles);
module.exports = Router;