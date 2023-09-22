const express = require('express');
const router = express.Router();
const authValidation = require('../../validations/auth.validation');
const authController = require('../../controllers/auth.controller');

router.post('/register', authValidation.register, authController.register);
router.post('/send-verification-email', authController.sendVerificationEmail);
router.get('/verify-email', authController.verifyEmail);
router.post('/forgot-password', authValidation.forgotPassword, authController.forgotPassword);
router.get('/forgot-email', authController.forgotEmail);
router.post('/reset-password', authValidation.resetPassword, authController.resetPassword);
router.post('/login', authValidation.login, authController.login);
router.post('/google', authValidation.google, authController.googleLogin);
router.get('/facebook', authValidation.google, authController.facebookLogin);
router.post('/logout', authValidation.logout, authController.logout);

module.exports = router;
