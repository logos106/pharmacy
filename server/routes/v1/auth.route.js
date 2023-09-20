const express = require('express');
const router = express.Router();
const authValidation = require('../../validations/auth.validation');
const authController = require('../../controllers/auth.controller');
const auth = require('../../middlewares/auth');

router.post('/register', authValidation.register, authController.register);
router.post('/send-verification-email', authController.sendVerificationEmail);
router.get('/verify-email', authController.verifyEmail);
router.post('/forgot-password', authValidation.forgotPassword, authController.forgotPassword);
router.get('/forgot-email', authController.forgotEmail);
router.post('/reset-password', authValidation.resetPassword, authController.resetPassword);
router.post('/login', authValidation.login, authController.login);
router.post('/logout', authValidation.logout, authController.logout);
//
module.exports = router;
