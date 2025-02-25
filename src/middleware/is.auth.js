const jwt = require("jsonwebtoken");
const { ApiResponseV2 } = require("../utils/api.response");
const { getUserById } = require("../services/user.service");

exports.isAuth = async (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return ApiResponseV2(res, 401, "Unauthorized");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    const user = await getUserById(req.user.id);
    if (user) {
      next();
    }else{
      return ApiResponseV2(res, 401, "Unauthorized");
    }

  } catch (error) {
    return ApiResponseV2(res, 401, "Unauthorized");
  }
};
