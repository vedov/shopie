const express = require("express");
const router = express.Router();
const tagController = require("../controllers/tag");

router.get("/", tagController.getTags);
router.get("/:id", tagController.getTag);
router.post("/", tagController.addTag);

module.exports = router;
