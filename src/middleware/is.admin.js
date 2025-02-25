const { getUserById } = require("../services/user.service")
const { ApiResponseV2 } = require("../utils/api.response");

exports.isAdmin = async (req, res, next) => {
    const user = await getUserById(req.user.id)
    if (user && user.role.name == "ADMIN") {
        next()
    }else{
        return ApiResponseV2(res, 401, "Unauthorized")
    }
}