const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");

/* router.post("/login", authController.login); */
router.get("/", authController.getRegister);
router.post("/", authController.register);
/* router.post("/validate", authController.validate); */

module.exports = router;
