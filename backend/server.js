const express = require("express");
const app = express();
const cors = require("cors");
const router = require("./api/dates.route.js");
const dotenv = require("dotenv");

dotenv.config()
const port = process.env.PORT

app.use(cors());
app.use(express.json());

app.use("/api/v1/dates", router);
app.use("*", (req, res) => res.status(404).json({ error: "not found" }))

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})