const router = require("express").Router();

const {createrolestaff} = require("./StaffRoleController");

router.post('/create',createrolestaff);

module.exports=router;