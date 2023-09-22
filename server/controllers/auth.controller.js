const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { authService, userService, tokenService, emailService } = require('../services');

const LOGIN_URL = 'http://pathosrose.com/?page=login';
const RESEST_URL = 'http://pathosrose.com/?page=reset-pwd';

const register = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  const tokens = await tokenService.generateAuthTokens(user);
  res.status(httpStatus.CREATED).send({ user, tokens });  
});

const sendVerificationEmail = catchAsync(async (req, res) => {
  const verifyEmailToken = await tokenService.generateVerifyEmailToken(req.body.email);
  await emailService.sendVerificationEmail(req.body.email, verifyEmailToken);
  res.status(httpStatus.NO_CONTENT).send();
});

const verifyEmail = catchAsync(async (req, res) => {
  await authService.verifyEmail(req.query.token);
  res.redirect(LOGIN_URL);
});

const forgotPassword = catchAsync(async (req, res) => {
  const resetPasswordToken = await tokenService.generateResetPasswordToken(req.body.email);
  await emailService.sendResetPasswordEmail(req.body.email, resetPasswordToken);
  res.status(httpStatus.NO_CONTENT).send();
});

const forgotEmail = catchAsync(async (req, res) => {
  const token = req.query.token;
  const newURL = RESEST_URL + '&token=' + token;
  res.redirect(newURL);
});

const resetPassword = catchAsync(async (req, res) => {
  await authService.resetPassword(req.body.token, req.body.password);
  res.status(httpStatus.NO_CONTENT).send();
});

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await authService.loginUserWithEmailAndPassword(email, password);
  const tokens = await tokenService.generateAuthTokens(user);
  res.send({ user, tokens });
});

const googleLogin = catchAsync(async (req, res) => {
  const { token } = req.body;
  const user = await authService.loginUserWithGoogle(token);
  const tokens = await tokenService.generateAuthTokens(user);
  res.send({ user, tokens });
});

const facebookLogin = catchAsync(async (req, res) => {
  console.log(req);
  res.status(httpStatus.NO_CONTENT).send();

  // const user = await authService.loginUserWithFacebook(token);
  // const tokens = await tokenService.generateAuthTokens(user);
  // res.send({ user, tokens });
});

const logout = catchAsync(async (req, res) => {
  await authService.logout(req.body.refreshToken);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  register,
  sendVerificationEmail,
  verifyEmail,
  forgotPassword,
  forgotEmail,
  resetPassword,
  login,
  googleLogin,
  facebookLogin,
  logout
};