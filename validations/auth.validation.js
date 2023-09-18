const Joi = require('joi');
const validate = require('../middlewares/validate');

function register(req, res, next) {
  const schema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().min(6).required(),
    role: Joi.string().required(),
  });

  validate(req, next, schema);
}

function verifyEmail(req, res, next) {
  const schema = Joi.object({
    token: Joi.string().required(),
  });

  validate(req, next, schema);
}
  
module.exports = {
  register,
  verifyEmail
};