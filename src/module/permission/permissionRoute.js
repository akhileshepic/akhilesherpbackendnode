const router = require('express').Router();
const { createPermission, updatePermission, getAllPermissions } = require('./permissionController');
router.post('/create', createPermission);
router.put('/update/:id', updatePermission);
router.put('/:id', updatePermission);
router.get('/all', getAllPermissions);
module.exports = router;
