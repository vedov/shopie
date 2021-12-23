const express = require("express");
const router = express.Router();
const index = require("../controllers/index");
const {
  registrationValidator,
  loginValidator,
} = require("../middleware/authValidators");

router.get("/", index.getLanding);
router.get("/register", index.getRegister);
/* router.post("/register", registrationValidator, index.postRegister); */
module.exports = router;
