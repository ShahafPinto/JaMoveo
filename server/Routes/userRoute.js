const express = require("express");
const {
  registerUser,
  loginUser,
  findUser,
  getUsers,
} = require("../Controllers/userController");

const router = express.Router();

router.post("/register", registerUser);
router.post("/admin-register", registerUser);
router.post("/login", loginUser);
router.get("/find/:userId", findUser); //אולי לא אצטרך בהמשך
router.get("/all", getUsers); //אולי לא אצטרך בהמשך

module.exports = router;
