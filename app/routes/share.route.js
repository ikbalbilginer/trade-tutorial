const express = require("express");
const share = require("../controllers/share.controller.js");

const router = express.Router();

router.get("/getAllShares", share.getAll);

module.exports = router;
