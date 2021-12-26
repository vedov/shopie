const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");

router.get("/", authController.getRegister);
router.get("/interests", authController.getInterestSelect);
router.post("/", authController.register);

module.exports = router;
