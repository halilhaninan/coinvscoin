const hataYakalama = (err, req, res, next) => {
  const statuskod = res.statusCode ? res.statusCode : 500;

  res.status(statuskod);

  res.json({
    mesaj: err.message,
    aciklama: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

module.exports = {
  hataYakalama,
};
