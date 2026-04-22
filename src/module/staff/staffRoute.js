const router = require("express").Router();
const { createStaff } = require("./staffController");

router.post("/create", createStaff);
// router.get("/all", getAllUsers);

module.exports = router;
