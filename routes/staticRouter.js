const express = require("express");
const URL = require("../models/url");

const router = express.Router();

router.get("/", async (req, res) => {
  const allurls = await URL.find({});
  return res.render("home", {
    urls: allurls,
    id: req.query.id || null, // ✅ get id from query string
  });
});

module.exports = router;
