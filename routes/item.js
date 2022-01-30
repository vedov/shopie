const express = require("express");
const router = express.Router();
const itemController = require("../controllers/item");
const parser = require("../middleware/cloudinary");
router.get("/", itemController.getItems);
router.get("/:id", itemController.getItem);
router.post("/", parser.array("imageUrls"), itemController.addItem);
module.exports = router;
