const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");
const itemController = require("../controllers/item");
const wishListController = require("../controllers/wishList");
const cartController = require("../controllers/cart");
const authMiddleware = require("../middleware/auth");
const orderController = require("../controllers/order");
const parser = require("../middleware/cloudinary");
/* const {
  registrationValidator,
  loginValidator,
} = require("../middleware/authValidators"); */

router.get("/", userController.getDashboard);
router.get("/wishList", wishListController.getWishList);
router.get("/cart", cartController.getCart);
router.post("/cart/coupon", cartController.addCoupon);
router.post("/cart/placeorder", orderController.addOrder);
router.post("/", parser.array("imageUrls"), itemController.addItem);
router.get("/catalogue", itemController.getCatalogue);
router.get("/orders", userController.getOrders);
router.get("/settings", userController.getSettings);
router.get("/users", userController.getUsers);
router.get("/users/:id", userController.getUser);
router.get("/users/delete/:id", userController.deleteUser);

/* router.post("/register", registrationValidator, index.postRegister); */
module.exports = router;
