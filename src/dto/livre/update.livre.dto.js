const joi = require("joi");

exports.updateLivreDto = joi.object({
  title: joi.string().min(2).max(100),
  author: joi.string().min(2).max(100),
  description: joi.string().min(10),
});
