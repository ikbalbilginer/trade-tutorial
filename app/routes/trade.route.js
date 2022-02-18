const express = require("express");
const trade = require("../controllers/trade.controller.js");
const { validateParams } = require("../middlewares");

const router = express.Router();

// validation middleware for rules on mail
router.use(validateParams);

router.post("/buy", trade.buy);
router.post("/sell", trade.sell);

module.exports = router;
