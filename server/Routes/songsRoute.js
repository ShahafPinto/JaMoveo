const express = require("express");
const router = express.Router();

const { searchSongs } = require("../Controllers/songsController");

router.get("/search", searchSongs);

module.exports = router;
