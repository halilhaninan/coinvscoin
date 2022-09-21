const express = require("express");
const {
  registerKullanici,
  loginKullanici,
  getKullanici,
} = require("../controllers/KullanıcıController.js");

const { kullaniciKontrol } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/", registerKullanici);
router.post("/login", loginKullanici);
router.get("/kullanici", kullaniciKontrol, getKullanici);

module.exports = router;
