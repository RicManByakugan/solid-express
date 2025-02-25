const express = require("express");
const {
  allUsers,
  userById,
  createUser,
  allUserWithPaginated,
} = require("../controller/user.controller");

const router = express.Router();

const { validateDto } = require("../middleware/validate.dto");

const { createUserDto } = require("../dto/user/create.user.dto");

const { isAuth } = require("../middleware/is.auth");

const { isAdmin } = require("../middleware/is.admin");

router.get("/", isAuth, isAdmin, allUsers);
router.get("/all-paginated", isAuth, isAdmin, allUserWithPaginated);
router.get("/:id", isAuth, isAdmin, userById);
router.post("/create", isAuth, isAdmin, validateDto(createUserDto), createUser);

module.exports = router;
