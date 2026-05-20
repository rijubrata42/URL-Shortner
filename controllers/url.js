const shortid = require("shortid");
const URL = require("../models/url");

async function handleGenerateNewShortURL(req, res) {
  const body = req.body;
  if (!body.url) return res.status(400).json({ error: "url is required" });

  let redirectURL = body.url;
  if (
    !redirectURL.startsWith("http://") &&
    !redirectURL.startsWith("https://")
  ) {
    redirectURL = "https://" + redirectURL;
  }

  const shortID = shortid();
  await URL.create({
    shortId: shortID,
    redirectURL: redirectURL,
    visitHistory: [],
  });

  // ✅ redirect instead of render — prevents resubmission on refresh
  return res.redirect(`/?id=${shortID}`);
}

async function handleGetAnalytics(req, res) {
  const shortId = req.params.shortId;
  const result = await URL.findOne({ shortId });
  return res.json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
}

module.exports = { handleGenerateNewShortURL, handleGetAnalytics };
