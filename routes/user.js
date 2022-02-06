const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");
const itemController = require("../controllers/item");
const wishListController = require("../controllers/wishList");
const cartController = require("../controllers/cart");
const authMiddleware = require("../middleware/auth");
const orderController = require("../controllers/order");
const authController = require("../controllers/auth");
const parser = require("../middleware/cloudinary");
/* const {
  registrationValidator,
  loginValidator,
} = require("../middleware/authValidators"); */

router.get("/", userController.getDashboard);
router.post("/", parser.array("imageUrls"), itemController.addItem);
router.get("/catalogue", itemController.getCatalogue);
router.post("/orders/setorderstatus/:id", orderController.setOrderStatus);
router.get("/settings", userController.getSettings);
router.get("/cart", cartController.getCart);
router.post("/cart/coupon", cartController.addCoupon);
router.post("/cart/placeorder", orderController.addOrder);
router.get("/wishList", wishListController.getWishList);
router.post("/wishList/remove/:id", wishListController.removeFromWishList);
router.get("/orders", orderController.getOrders);
router.get("/messages", userController.getMessages);
router.get("/users", userController.getUsers);
router.get("/:id", userController.getUserProfile);
router.get("/:id/:category", userController.getUserProfile);
router.get("/users/:id", userController.getUser);
router.get("/users/delete/:id", userController.deleteUser);
router.get("/users/archive/:id", userController.archiveUser);
router.post("/logout", authController.logout);

/* router.post("/register", registrationValidator, index.postRegister); */
module.exports = router;
