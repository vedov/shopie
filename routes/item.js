const express = require("express");
const router = express.Router();
const itemController = require("../controllers/item");

router.get("/", itemController.getItems);
router.get("/:id", itemController.getItem);
router.post("/", itemController.addItem);
module.exports = router;
