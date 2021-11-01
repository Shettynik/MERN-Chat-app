const express = require("express");
const userControllers = require("../controllers/userControllers");
const router = express.Router();

router.post("/login", userControllers.login);
router.post("/register", userControllers.register);

module.exports = router;