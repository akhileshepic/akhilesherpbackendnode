const router = require("express").Router();
const { createUser } = require("./userController");

router.post("/create", createUser);
// router.get("/all", getAllUsers);

module.exports = router;
