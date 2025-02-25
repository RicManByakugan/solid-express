const express = require("express");
const router = express.Router();

const {
  login, current
} = require("../controller/auth.controller");

const { isAuth } = require("../middleware/is.auth")

router.get("/current", isAuth, current);
router.post("/login", login);

module.exports = router;
