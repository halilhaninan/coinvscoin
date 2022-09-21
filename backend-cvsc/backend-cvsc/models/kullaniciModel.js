const mongoose = require("mongoose");

const kullaniciSchema = mongoose.Schema(
  {
    kullaniciAd: {
      type: String,
      required: [true, "lutfen kullanici ad giriniz"],
    },
    email: {
      type: String,
      required: [true, "lutfen e-mail griniz"],
      unique: true,
    },
    parola: {
      type: String,
      required: [true, "lutfen parola giriniz"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("kullanicis", kullaniciSchema);
