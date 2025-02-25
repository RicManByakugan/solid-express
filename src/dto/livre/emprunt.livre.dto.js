const joi = require("joi");

exports.empruntLivreDto = joi.object({
  userId: joi.number().required(),
  livreId: joi.number().required(),
  date_rendu: joi.date().required(),
});
