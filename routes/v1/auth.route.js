const express = require('express');
const router = express.Router();
const authValidation = require('../../validations/auth.validation');
const authController = require('../../controllers/auth.controller');
const auth = require('../../middlewares/auth');

router.post('/register', authValidation.register, authController.register);
router.post('/send-verification-email', authController.sendVerificationEmail);
router.post('/verify-email', authValidation.verifyEmail, authController.verifyEmail);

module.exports = router;
