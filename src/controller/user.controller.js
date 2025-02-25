const {
  getAllUsers,
  getAllUserWithPagination,
  getUserById,
  createUser,
} = require("../services/user.service");
const { ApiResponseV2 } = require("../utils/api.response");

exports.allUserWithPaginated = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const users = await getAllUserWithPagination(page, limit);
    datareturn = {
      page,
      limit,
      totalPages: Math.ceil(users.totalUsers / limit),
      users: users.users,
    };
    return ApiResponseV2(res, 200, "Users retrieved successfully", datareturn);
  } catch (error) {
    return ApiResponseV2(res, 500, "Failed to retrieve users" + error.message);
  }
};

exports.allUsers = async (req, res) => {
  try {
    const users = await getAllUsers();
    return ApiResponseV2(res, 200, "Users retrieved successfully", users);
  } catch (error) {
    return ApiResponseV2(res, 500, "Failed to retrieve users" + error.message);
  }
};

exports.userById = async (req, res) => {
  try {
    const user = await getUserById(parseInt(req.params.id));
    if (!user) {
      return ApiResponseV2(res, 404, "User not found");
    }
    return ApiResponseV2(res, 200, "User retrieved successfully", user);
  } catch (error) {
    return ApiResponseV2(res, 500, "Failed to retrieve user" + error.message);
  }
};

exports.createUser = async (req, res) => {
  try {
    const user = await createUser(req.body);
    return ApiResponseV2(res, 201, "User created successfully", user);
  } catch (error) {
    return ApiResponseV2(res, 500, "Failed to create user" + error.message);
  }
};
