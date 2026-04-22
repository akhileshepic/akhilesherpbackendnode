const router = require("express").Router();

const {createDepartment, getallDepartment, updatedDepartment, deleteDepartment} = require("./departmentController");
router.post('/create', createDepartment);
router.get('/all', getallDepartment);
router.put('/:id',updatedDepartment);
router.delete('/:id',deleteDepartment);
module.exports=router;