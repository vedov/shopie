const express = require("express");
const router = express.Router();
const indexController = require("../controllers/index");
const itemController = require("../controllers/item");
/* const {
  registrationValidator,
  loginValidator,
} = require("../middleware/authValidators"); */

router.get("/", indexController.getLanding);
router.get("/search/category/:id", itemController.getItemsByCategory);
router.get("/search/:name", itemController.getItemByName);

/* router.post("/register", registrationValidator, index.postRegister); */
module.exports = router;
