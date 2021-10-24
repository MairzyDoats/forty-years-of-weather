const express = require("express");
const router = express.Router();
const axios = require("axios");
const dotenv = require("dotenv")

dotenv.config()

router.get("/", (req, res, next) => {
  axios.get(process.env.DATES_WEBHOOK)
    .then((response) => {
      res.json(response.data)
    })
    .catch(function (err) {
      console.log(err);
    })
});

module.exports = router;