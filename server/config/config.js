const dotenv = require('dotenv');
const path = require('path');
const Joi = require('joi');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid('production', 'development', 'test').required(),
    PORT: Joi.number().default(5000),
    JWT_SECRET: Joi.string().required().description('JWT secret key')
  })
  .unknown();

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  jwt: {
    secret: envVars.JWT_SECRET,
    verifyEmailExpirationMinutes: envVars.JWT_VERIFY_EXPIRE_MINUTE,
    resetPasswordExpirationMinutes: envVars.JWT_RESET_EXPIRE_MINUTE,
  },
  email: {
    service: "gmail",
    auth: {
        user: "nxwang00@gmail.com",
        pass: "itkdhhwljhpwivna"
    }
  }

};
