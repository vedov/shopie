const express = require("express");
const router = express.Router();
const interestController = require("../controllers/interest");

router.get("/", interestController.getInterests);
router.get("/:id", interestController.getInterest);
router.post("/", interestController.addInterest);

module.exports = router;
