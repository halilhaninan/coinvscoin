const asyncHandler = require("express-async-handler");

const coinModel = require("../models/coinModel");

const sendVote = asyncHandler(async (req, res) => {
  const vote = await coinModel.findOne({
    contractAddress: req.body.contractAddress,
  });

  await vote.update({
    vote: vote.vote + 1,
    votes: [Date.now(), ...vote.votes],
  });

  res.status(200).json(vote);
});

module.exports = { sendVote };
