const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");
const itemController = require("../controllers/item");
const authMiddleware = require("../middleware/auth");

/* const {
  registrationValidator,
  loginValidator,
} = require("../middleware/authValidators"); */

router.get("/", userController.getDashboard);
router.post("/", itemController.addItem);
router.get("/catalogue", itemController.getCatalogue);
router.get("/orders", userController.getOrders);
router.get("/settings", userController.getSettings);
router.get("/users", userController.getUsers);
router.get("/users/:id", userController.getUser);
router.get("/users/delete/:id", userController.deleteUser);

/* router.post("/register", registrationValidator, index.postRegister); */
module.exports = router;
