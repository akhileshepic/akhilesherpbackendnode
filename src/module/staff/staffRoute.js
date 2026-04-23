const router = require("express").Router();
const { createStaff, loginStaff, refreshToken, staffagregatefunction } = require("./staffController");

router.post("/create", createStaff);
router.post("/login", loginStaff);
router.post("/refresh", refreshToken);
// router.get("/all", getAllUsers);
router.post('/:id',staffagregatefunction)
module.exports = router;
