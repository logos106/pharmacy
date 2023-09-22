const httpStatus = require('http-status');
const tokenService = require('./token.service');
const userService = require('./user.service');
const ApiError = require('../utils/ApiError');
const { tokenTypes } = require('../config/tokens');
const config = require('../config/config');
const db = require("../models");
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));


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
  if (!user || user.password != '' || (user.password != password)) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect email or password');
  }

  if (!user.isActive) 
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Not approved yet');

  return user;
};

const loginUserWithGoogle = async (token) => {
  const response = await fetch('https://people.googleapis.com/v1/people/me?personFields=names,emailAddresses', { headers: {Authorization: 'Bearer ' + token}})
  const json = await response.json();
  console.log(json);
  const email = json.emailAddresses[0].value;
  const firstName = json.names[0].givenName;
  const lastName = json.names[0].familyName;

  let user = await userService.getUserByEmail(email);
  if (!user) {
    const param = {
      email: email,
      password: "",
      firstName: firstName,
      lastName: lastName,
      role: "user",
      isActive: 1
    }
    user = await userService.createUser(param);  
  }
  
  return user;
};

const loginUserWithFacebook = async (token) => {
  const url = `https://graph.facebook.com/me?access_token=${token}`
  const response = await fetch(url);
  const json = await response.json();
  console.log(url, json);

  // const email = json.emailAddresses[0].value;
  // const firstName = json.names[0].givenName;
  // const lastName = json.names[0].familyName;

  // let user = await userService.getUserByEmail(email);
  // if (!user) {
  //   const param = {
  //     email: email,
  //     password: "",
  //     firstName: firstName,
  //     lastName: lastName,
  //     role: "user",
  //     isActive: 1
  //   }
  //   user = await userService.createUser(param);  
  // }
  return { user: 'wnag'}
  // return user;
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
    loginUserWithGoogle,
    loginUserWithFacebook,
    logout
};
