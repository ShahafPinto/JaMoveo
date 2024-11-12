const express = require("express");
const router = express.Router();
const { createRehearsalSession, findUserSession } = require("../Controllers/sessionController");

router.post("/join", createRehearsalSession);
//router.get("/:userId", findUserSession);

module.exports = router;