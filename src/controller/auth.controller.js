const { findUserByUserName } = require("../services/auth.service");
const { getUserById } = require("../services/user.service");
const { ApiResponseV2 } = require("../utils/api.response");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.current = async (req, res) => {
  try {
    const user = await getUserById(req.user.id);
    return ApiResponseV2(res, 200, "User retrieved successfully", user);
  } catch (error) {
    return ApiResponseV2(res, 500, "Failed to retrieve users" + error.message);
  }
};

exports.login = async (req, res) => {
  try {
    const { phone, password } = req.body;
    const user = await findUserByUserName(phone);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return ApiResponseV2(res, 401, "Invalid credentials");
    }

    const token = jwt.sign(
      { id: user.id, role: user.roleId },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    return ApiResponseV2(res, 200, "Login successful", { token });
  } catch (error) {
    return ApiResponseV2(res, 500, "Failed to retrieve users" + error.message);
  }
};
