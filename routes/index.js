const express = require("express");
const router = express.Router();
const indexController = require("../controllers/index");
/* const {
  registrationValidator,
  loginValidator,
} = require("../middleware/authValidators"); */

router.get("/", indexController.getLanding);

/* router.post("/register", registrationValidator, index.postRegister); */
module.exports = router;
