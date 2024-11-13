const express = require("express");
const router = express.Router();
const { createRehearsalSession } = require("../Controllers/sessionController");

router.post("/join", createRehearsalSession);

module.exports = router;
