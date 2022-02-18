const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// database connection
const { db, bootstrap_testData } = require("./app/models");

// initialize test data from /constants/testData
db.sequelize.sync().then(() => {
  bootstrap_testData();
});

app.get("/", (req, res) => {
  res.json({ message: "Welcome to trade-tutorial application." });
});

app.use("/trade", require("./app/routes/trade.route.js"));
app.use("/share", require("./app/routes/share.route.js"));
app.use("/user", require("./app/routes/user.route.js"));

const PORT = process.env.PORT || 3100;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
