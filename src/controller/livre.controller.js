const {
  createLivre,
  getAllLivres,
  getAllLivresWithPagination,
  updateLivreService,
  getLivreById,
} = require("../services/livre.service");
const { ApiResponseV2 } = require("../utils/api.response");

exports.getAllLivres = async (req, res) => {
  try {
    const users = await getAllLivres();
    return ApiResponseV2(res, 200, "Book retrieved successfully", users);
  } catch (error) {
    return ApiResponseV2(res, 500, "Failed to retrieve users" + error.message);
  }
};

exports.getAllLivresWithPagination = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const users = await getAllLivresWithPagination(page, limit);
    datareturn = {
      page,
      limit,
      totalPages: Math.ceil(users.totalLivres / limit),
      livres: users.livres,
    };
    return ApiResponseV2(res, 200, "Book retrieved successfully", datareturn);
  } catch (error) {
    return ApiResponseV2(res, 500, "Failed to retrieve users" + error.message);
  }
};

exports.getLivreById = async (req, res) => {
  try {
    const book = await getLivreById(parseInt(req.params.id));
    if (!book) {
      return ApiResponseV2(res, 404, "Book not found");
    }
    return ApiResponseV2(res, 200, "Book retrieved successfully", book);
  } catch (error) {
    return ApiResponseV2(res, 500, "Failed to retrieve book" + error.message);
  }
};

exports.createLivre = async (req, res) => {
  try {
    req.body.userId = req.user.id;
    const book = await createLivre(req.body);
    return ApiResponseV2(res, 201, "Book created successfully", book);
  } catch (error) {
    return ApiResponseV2(res, 500, "Failed to create book" + error.message);
  }
};

exports.updateLivre = async (req, res) => {
  try {
    const book = await updateLivreService(parseInt(req.params.id), req.body);
    return ApiResponseV2(res, 200, "Book updated successfully", book);
  } catch (error) {
    return ApiResponseV2(res, 500, "Failed to update book" + error.message);
  }
};
