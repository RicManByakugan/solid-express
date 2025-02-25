const { ApiResponse } = require("../utils/api.response");

exports.validateDto = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(400).json(ApiResponse(error.details[0].message, false));
  }
  next();
};
