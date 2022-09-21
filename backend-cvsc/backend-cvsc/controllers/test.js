const asyncHandler = require("express-async-handler");
const coinModel = require("../models/coinModel");
const Web3 = require("web3");
const chalk = require("chalk");

const contractAddress = "0x0566B9a8fFb8908682796751EEd00722da967Be0";
//
(async function () {
  console.log("ahmet");
  coinModel.findOne(
    {
      a.contractAddress,
    },
    function (err, obj) {
      console.log(err);
      console.log(obj);
    }
  );
})();
