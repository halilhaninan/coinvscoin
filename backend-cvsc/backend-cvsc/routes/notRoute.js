const express = require("express");
const router = express.Router();
const {
  getNotlar,
  setNotlar,
  updateNotlar,
  deleteNotlar,
} = require("../controllers/notController");

const { kullaniciKontrol } = require("../middlewares/authMiddleware");

// islem yaparken kullanicikontrol gerekiyor token uzerinden etkilesim sagliyor !!! post put ve delete de kullanicilari bilmeliyiz fakat get kisminda herkes gorebilsin istiyoruz o yuzden kullaniciKontrol kismina gerek yok
router
  .route("/")
  .get(kullaniciKontrol, getNotlar)
  .post(kullaniciKontrol, setNotlar);
router
  .route("/:id")
  .put(kullaniciKontrol, updateNotlar)
  .delete(kullaniciKontrol, deleteNotlar);

// router.get("/", getNotlar);
// router.post("/", setNotlar);
// router.put("/:id", updateNotlar);
// router.delete("/:id", deleteNotlar);

module.exports = router;
