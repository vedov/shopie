const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");

router.get("/", authController.getRegister);
router.post("/", authController.register);

module.exports = router;
