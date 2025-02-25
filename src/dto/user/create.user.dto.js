const joi = require("joi");

exports.createUserDto = joi.object({
  name: joi.string().min(2).max(100).required(),
  first_name: joi.string().min(2).max(100).required(),
  cin: joi.string().min(10).max(10).required(),
  phone: joi.string().min(5).max(20).required(),
  password: joi.string().min(2).max(100).required(),
  roleId: joi.number().required(),
});