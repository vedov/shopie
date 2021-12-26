const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");
const authMiddleware = require("../middleware/auth");
/* const {
  registrationValidator,
  loginValidator,
} = require("../middleware/authValidators"); */

router.get("/", userController.getDashboard);
router.get("/catalogue", userController.getCatalogue);
router.get("/orders", userController.getOrders);
router.get("/settings", userController.getSettings);

/* router.post("/register", registrationValidator, index.postRegister); */
module.exports = router;
