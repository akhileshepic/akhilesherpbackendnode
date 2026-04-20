const router = require('express').Router();
const moduleController = require('./moduleController');
router.post('/create', moduleController.createModule);
router.get('/all', moduleController.getAllModules);
module.exports = router;