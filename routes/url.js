const express = require("express");
const {
  handleGenerateNewShortURL,
  handleGetAnalytics,
  handleDeleteAllData,
} = require("../controllers/url");
const router = express.Router();

router.post("/", handleGenerateNewShortURL);

router.delete("/deleteAll", handleDeleteAllData);

router.get("/analytics/:shortId", handleGetAnalytics);

module.exports = router;
