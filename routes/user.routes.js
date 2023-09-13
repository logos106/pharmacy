const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('../middleware/validate-request');
const verifyToken = require('../middleware/verify-token');
const userController = require('../controller/user.controller');

router.post('/register', registerSchema, register);
router.get('/confirm/:email/:token', confirm);
router.post('/login', authenticateSchema, authenticate);
router.get('/logout', verifyToken, logout);
router.get('/test', function(req, res, next) {
  res.send('ok')
});

module.exports = router;

function registerSchema(req, res, next) {
  const schema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().min(6).required(),
    role: Joi.string().required(),
  });

  validateRequest(req, next, schema);
}

function register(req, res, next) {
  userController
    .create(req)
    .then(() => {
      res.json({ message: 'Snet a confirmation email to your address' });
    })
    .catch(err => {
      if (err == '1') res.status(200).send({code: 101, message: 'This Email Address is already taken.'})
      if (err == '2') res.status(200).send({code: 102, message: 'Failed to send confirmation email.'})
    });
}

function confirm(req, res, next) {
  userController
    .confirm(req.body)
    .then(() => {
      res.json({ message: 'Email verification was successful' });
    })
    .catch(err => {
      if (err == '1') res.status(200).send({code: 101, message: 'This Email Address is already taken.'})
      if (err == '2') res.status(200).send({code: 102, message: 'Failed to send confirmation email.'})
    });
}

function authenticateSchema(req, res, next) {
  const schema = Joi.object({
    email: Joi.string()
      .required()
      .email({ tlds: { allow: false } })
      .messages({
        'any.required': `Email field is required.`,
        'string.empty': `Email cannot be empty.`,
        'string.email': `This Email address is not valid email type.`,
      }),
    password: Joi.string().required().messages({
      'any.required': `Password field is required.`,
      'string.empty': `Password cannot be empty.`,
    }),
  });
  validateRequest(req, next, schema);
}

function authenticate(req, res, next) {
  userController
    .authenticate(req.body)
    .then((user) => res.json(user))
    .catch(err => {
      if (err == '1') res.status(200).send({code: 111, message: 'Email address does not exist'})
      if (err == '2') res.status(200).send({code: 112, message: 'Administrator didn\'t allow you yet'})
      if (err == '3') res.status(200).send({code: 113, message: 'Password is incorrect'})
    });
}

function logout(req, res, next) {
  userController
    .logout(req.user.email)
    .then(() => {
      res.json({ message: 'Logged out' });
    })
}

