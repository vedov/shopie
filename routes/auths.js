const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");

/* router.post("/login", authController.login); */
router.get("/", authController.getRegister);
router.post("/", authController.register);
router.get("/", authController.getLogin);
router.post("/", authController.login);
/* router.post("/validate", authController.validate); */

module.exports = router;
