const express = require("express");
const router = express.Router();
const itemController = require("../controllers/item");
const reviewController = require("../controllers/review");
const wishListController = require("../controllers/wishList");
const cartController = require("../controllers/cart");
const parser = require("../middleware/cloudinary");
router.get("/", itemController.getItems);
router.get("/:id", itemController.getItem);
router.post("/wishList/:id", wishListController.addToWishList);
router.post("/cart/:id", cartController.addToCart);

router.post("/cart/remove/:id", cartController.removeFromCart);
router.post("/", parser.array("imageUrls"), itemController.addItem);
router.post("/addReview/:id", reviewController.addReview);
module.exports = router;
