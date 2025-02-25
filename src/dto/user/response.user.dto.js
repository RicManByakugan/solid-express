const joi = require("joi");

exports.responseUserDto = joi.object({
  id: joi.number().required(),
  name: joi.string().min(2).max(100).required(),
  first_name: joi.string().min(2).max(100).required(),
  cin: joi.string().min(10).max(10).required(),
  phone: joi.string().min(5).max(20).required(),
  roleId: joi.number().required(),
  role: joi.object(),
  // Virtual property
  fullName: joi.string().default((parent) => `${parent.first_name} ${parent.name}`)
});