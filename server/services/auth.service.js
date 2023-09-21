const httpStatus = require('http-status');
const tokenService = require('./token.service');
const userService = require('./user.service');
const ApiError = require('../utils/ApiError');
const { tokenTypes } = require('../config/tokens');
const db = require("../models");

const verifyEmail = async (verifyEmailToken) => {
  try {
    const verifyEmailTokenDoc = await tokenService.verifyToken(verifyEmailToken, tokenTypes.VERIFY_EMAIL);
    const user = await userService.getUserById(verifyEmailTokenDoc.userID);
    if (!user) {
        throw new Error();
    }
    await db.Token.destroy({where: { userID: user.id, type: tokenTypes.VERIFY_EMAIL }});
    user.isActive = true;
    user.save();

  } catch (error) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'Email verification failed');
  }
};

const resetPassword = async (resetPasswordToken, newPassword) => {
  try {
    const resetPasswordTokenDoc = await tokenService.verifyToken(resetPasswordToken, tokenTypes.RESET_PASSWORD);
    const user = await userService.getUserById(resetPasswordTokenDoc.userID);
    if (!user) {
      throw new Error();
    }
    await userService.updateUserById(user.id, { password: newPassword });
    await db.Token.destroy({ where: {userID: user.id, type: tokenTypes.RESET_PASSWORD} });
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password reset failed');
  }
};

const loginUserWithEmailAndPassword = async (email, password) => {
  const user = await userService.getUserByEmail(email);
  if (!user || (user.password != password)) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect email or password');
  }

  if (!user.isActive) 
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Not approved yet');

  return user;
};

const logout = async (refreshToken) => {
  const refreshTokenDoc = await db.Token.findOne({where: { token: refreshToken, type: tokenTypes.REFRESH, blacklisted: false }});
  if (!refreshTokenDoc) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Not found');
  }
  await refreshTokenDoc.destroy();
};

module.exports = {
    verifyEmail,
    resetPassword,
    loginUserWithEmailAndPassword,
    logout
};
