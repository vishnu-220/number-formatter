var Joi = require('joi');

exports.bodyValidation = {
    body: {
      firstname: Joi.string().required(),
      lastname: Joi.string().required(),
      mobile: Joi.string().regex(/[0-9]{10}/).required(),
      email : Joi.string().email().required(),
      password: Joi.string().regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/).required(),
      age : Joi.number().integer().required()
    }
};

exports.headerValidation = {
  headers: {
    accesstoken: Joi.string().required()
  }
}

exports.queryParamsValidation = {
  query: {
    from: Joi.string().isoDate().required(),
    to: Joi.string().required().isoDate(),
    sortKey: Joi.string().default('user_id'),
    sortOrder: Joi.string().regex(/\b(?:ASC|DESC)\b/i).default('ASC')
  }
}