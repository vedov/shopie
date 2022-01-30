const express = require("express");
const router = express.Router();
const itemTypeController = require("../controllers/itemType");

router.get("/", itemTypeController.getItemTypes);
router.get("/:id", itemTypeController.getItemType);
router.post("/", itemTypeController.addItemType);

module.exports = router;
