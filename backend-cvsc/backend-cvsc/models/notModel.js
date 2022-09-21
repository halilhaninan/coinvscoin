const mongoose = require("mongoose");

const notSchema = mongoose.Schema(
  {
    kullanici: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "kullanicis",
    },
    baslik: {
      type: String,
      required: [true, "lutfen not basligni giriniz"],
    },
    aciklama: {
      type: String,
      required: [(true, "lutfen not aciklamasini griniz")],
    },
    oncelik: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Not", notSchema);
