const express = require("express");

const router = express.Router();

const { getAll, create, getById } = require("../controller/role.controller");

const { validateDto } = require("../middleware/validate.dto");

const { createRoleDto } = require("../dto/role/create.role.dto");

const { isAuth } = require("../middleware/is.auth");

const { isAdmin } = require("../middleware/is.admin");

router.get("/", isAuth, isAdmin, getAll);
router.get("/:id", isAuth, isAdmin, getById);
router.post("/create", isAuth, isAdmin, validateDto(createRoleDto), create);

module.exports = router;
