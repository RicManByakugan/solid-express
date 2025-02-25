const express = require("express");
const router = express.Router();
const { validateDto } = require("../middleware/validate.dto");
const { createLivreDto } = require("../dto/livre/create.livre.dto");
const { updateLivreDto } = require("../dto/livre/update.livre.dto");

const {
  getAllLivresWithPagination,
  createLivre,
  getAllLivres,
  updateLivre,
  getLivreById,
} = require("../controller/livre.controller");

const { isAuth } = require("../middleware/is.auth");

router.get("/", isAuth, getAllLivres);
router.get("/all-paginated", isAuth, getAllLivresWithPagination);
router.get("/:id", isAuth, getLivreById);
router.post("/create", isAuth, validateDto(createLivreDto), createLivre);
router.put("/update/:id", isAuth, validateDto(updateLivreDto), updateLivre);

module.exports = router;
