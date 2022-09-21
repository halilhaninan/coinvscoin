const { response } = require("express");
const express = require("express");
const dotenv = require("dotenv").config();

const { hataYakalama } = require("./middlewares/errorMiddleware");
const baglan = require("./config/db");

const PORT = process.env.PORT;

const app = express();

const cors = require("cors");

app.use(cors()); //

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/notlar", require("./routes/notRoute"));
app.use("/api/kullanicilar", require("./routes/kullaniciRoute"));
app.use("/coin", require("./routes/coinRoute"));
//
app.use("/api/vote", require("./routes/voteRoute"));

app.use(hataYakalama);

baglan();

app.listen(PORT, () => console.log(`Server ${PORT} online`));
