const {
  createLivre,
  getAllLivres,
  getAllLivresWithPagination,
  updateLivreService,
  getLivreById,
} = require("../services/livre.service");
const { ApiResponseV2 } = require("../utils/api.response");
const { v4: uuidv4 } = require("uuid");
const supabase = require("../../configuration/supabase");
const { slugify } = require("../utils/slugify");

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

    let coverUrl = null;

    if (req.file) {
      const originalName = req.file.originalname;
      const cleanFileName = slugify(originalName);
      const fileName = `covers/${uuidv4()}-${cleanFileName}`;
      const { data, error } = await supabase.storage
        .from("livres")
        .upload(fileName, req.file.buffer, {
          contentType: req.file.mimetype,
          upsert: true,
        });

      if (error) {
        throw new Error("Échec de l'upload de l'image : " + error.message);
      }

      const { data: publicUrl } = await supabase.storage
        .from("livres")
        .getPublicUrl(fileName);
      coverUrl = publicUrl.publicUrl;
    }


    // const coverFilename = req.file ? req.file.filename : null;
    req.body.cover = coverUrl;
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
