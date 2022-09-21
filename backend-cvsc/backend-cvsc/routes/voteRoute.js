const express = require("express");
const router = express.Router();
const { kullaniciKontrol } = require("../middlewares/authMiddleware");

const { sendVote } = require("../controllers/voteController");

router.route("/").get(sendVote).post(sendVote);

module.exports = router;
