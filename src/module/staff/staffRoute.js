const router = require("express").Router();
const { createStaff, loginStaff } = require("./staffController");

router.post("/create", createStaff);
router.post("/login", loginStaff);
// router.get("/all", getAllUsers);

module.exports = router;
