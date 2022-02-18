const express = require("express");
const user = require("../controllers/user.controller.js");

const router = express.Router();

router.get("/getUserPortfolio/:id", user.getPortfolio);

module.exports = router;
