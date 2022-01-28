const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");

router.get("/", authController.getRegister);
router.get("/interests", authController.getInterestSelect);
router.post("/interests", authController.addUserInterest);
router.post("/", authController.register);

module.exports = router;
