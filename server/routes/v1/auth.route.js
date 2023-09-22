const express = require('express');
const router = express.Router();
const authValidation = require('../../validations/auth.validation');
const authController = require('../../controllers/auth.controller');


const passport = require('passport');
const Strategy = require('passport-facebook').Strategy;

passport.use(new Strategy({
    clientID: "1008962086896923",
    clientSecret: "89d35b417035a0845f0aa736cd503a47",
    callbackURL: '/facebook/callback'
  },
  function(accessToken, refreshToken, profile, cb) {
    // save the profile on the Database
    // Save the accessToken and refreshToken if you need to call facebook apis later on
    return cb(null, profile);
}));


router.post('/register', authValidation.register, authController.register);
router.post('/send-verification-email', authController.sendVerificationEmail);
router.get('/verify-email', authController.verifyEmail);
router.post('/forgot-password', authValidation.forgotPassword, authController.forgotPassword);
router.get('/forgot-email', authController.forgotEmail);
router.post('/reset-password', authValidation.resetPassword, authController.resetPassword);
router.post('/login', authValidation.login, authController.login);
router.post('/google', authValidation.google, authController.googleLogin);
router.get('/facebook', passport.authenticate('facebook'));
router.get('/facebook/callback', authController.facebookLogin);
router.post('/logout', authValidation.logout, authController.logout);

module.exports = router;
