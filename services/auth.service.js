const httpStatus = require('http-status');
const tokenService = require('./token.service');
const userService = require('./user.service');
const ApiError = require('../utils/ApiError');

const verifyEmail = async (verifyEmailToken) => {
    try {
        const verifyEmailTokenDoc = await tokenService.verifyToken(verifyEmailToken, tokenTypes.VERIFY_EMAIL);
        const user = await userService.getUserById(verifyEmailTokenDoc.userID);
        if (!user) {
            throw new Error();
        }
        // await Token.deleteMany({ user: user.id, type: tokenTypes.VERIFY_EMAIL });
        // await userService.updateUserById(user.id, { isEmailVerified: true });
        user.isActive = true;
        user.save();

    } catch (error) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Email verification failed');
    }
};

module.exports = {
    verifyEmail,
};