const express = require("express");
const router = express.Router();

const {
  findCoin,
  getCoin,
  updateCoin,
} = require("../controllers/coinController");

router.route("/").get(getCoin).post(findCoin, updateCoin);

module.exports = router;
