const mongoose = require("mongoose");

const coinSchema = mongoose.Schema(
  {
    id: {
      type: String,
    },
    contractAddress: {
      type: String,
      unique: true,
    },
    logo: {
      type: String,
    },
    name: {
      type: String,
    },
    price: {
      type: String,
    },
    marketcap: {
      type: String,
    },
    telegram: {
      type: String,
    },
    website: {
      type: String,
    },
    twitter: {
      type: String,
    },
    vote: {
      type: Number,
    },
    votes: {
      type: Array,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("coinlists", coinSchema);
