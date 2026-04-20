const router = require('express').Router();
const { createPermission, getAllPermissions } = require('./permissionController');
router.post('/create', createPermission);
router.get('/all', getAllPermissions);
module.exports = router;
