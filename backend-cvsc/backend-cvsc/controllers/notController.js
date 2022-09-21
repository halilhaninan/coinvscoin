const asyncHandler = require("express-async-handler");
const notModel = require("../models/notModel.js");
const kullaniciModel = require("../models/kullaniciModel.js");

const getNotlar = asyncHandler(async (req, res) => {
  const notlar = await notModel
    .find({ kullanici: req.user.id })
    .sort({ createdAt: -1 });

  res.status(200).json(notlar);
});

const setNotlar = asyncHandler(async (req, res) => {
  if (!req.body.baslik || !req.body.aciklama) {
    res.status(400);
    throw new Error("lutfen baslik ve aciklama alanlarini giriniz ");
  }
  const not = await notModel.create({
    baslik: req.body.baslik,
    aciklama: req.body.aciklama,
    oncelik: req.body.oncelik,
    kullanici: req.user.id,
  });

  res.status(200).json(not);
});

const updateNotlar = asyncHandler(async (req, res) => {
  // res
  //   .status(200)
  //   .json({ mesaj: `controller ${req.params.id} idli notlar updatenotlar` });

  const not = await notModel.findById(req.params.id);

  const kullanici = await kullaniciModel.findById(req.user.id);

  if (!kullanici) {
    res.status(400);
    throw new Error("kullanici bulunamadi");
  }

  // kullanici kendi notunu goruntuluyor mu???
  if (not.kullanici.toString() !== kullanici.id) {
    res.status(401);
    throw new Error("kullanici yetkili degil");
  }

  if (!not) {
    res.status(400);
    throw new Error("not bulunamadi");
  }

  const guncellendi = await notModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json(guncellendi);
});

const deleteNotlar = asyncHandler(async (req, res) => {
  // res.status(200).json({
  //   mesaj: `controller ${req.params.id} idli notlar delete notlar`,
  // });

  const not = await notModel.findById(req.params.id);
  const kullanici = await kullaniciModel.findById(req.user.id);

  if (!kullanici) {
    res.status(400);
    throw new Error("kullanici bulunamadi");
  }

  if (!not) {
    res.status(400);
    throw new Error("delete not found");
  }

  if (not.kullanici.toString() !== kullanici.id) {
    res.status(401);
    throw new Error("kullanici yetkili degil");
  }

  await not.remove();

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getNotlar,
  setNotlar,
  updateNotlar,
  deleteNotlar,
};
