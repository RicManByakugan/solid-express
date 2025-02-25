const joi = require("joi");

exports.createRoleDto = joi.object({
  name: joi.string().min(3).max(255).required(),
});
