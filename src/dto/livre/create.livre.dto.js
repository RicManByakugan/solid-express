const joi = require("joi");

exports.createLivreDto = joi.object({
  title: joi.string().min(2).max(100).required(),
  author: joi.string().min(2).max(100).required(),
  description: joi.string().min(10).required(),
});
