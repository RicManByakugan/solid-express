const { getAll, getById, create } = require("../services/role.service");
const { ApiResponse } = require("../utils/api.response");

exports.getAll = async (req, res) => {
  try {
    const data = await getAll();
    res.status(200).json(ApiResponse("Success", true, data));
  } catch (err) {
    res.status(500).json(ApiResponse(err.message, false));
  }
};
exports.getById = async (req, res) => {
  try {
    const data = await getById(parseInt(req.params.id));
    res.status(200).json(ApiResponse("Success", true, data));
  } catch (err) {
    res.status(500).json(ApiResponse(err.message, false));
  }
};
exports.create = async (req, res) => {
  try {
    const data = await create(req.body);
    res.status(200).json(ApiResponse("Success", true, data));
  } catch (err) {
    res.status(500).json(ApiResponse(err.message, false));
  }
};
