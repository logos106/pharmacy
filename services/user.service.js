const httpStatus = require('http-status');
const db = require("../models");
const ApiError = require('../utils/ApiError');

const createUser = async (userBody) => {
    if (await db.User.findOne({where: { email: userBody.email }})) 
        throw new ApiError(httpStatus.BAD_REQUEST, 'This Email Address is already taken');

    const user = await db.User.create(userBody);
    return user;
};

const getUserById = async (id) => {
    return db.User.findById(id);
};

const updateUserById = async (userId, updateBody) => {
    const user = await getUserById(userId);
    if (!user) {
        throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }
    if (updateBody.email && (await User.isEmailTaken(updateBody.email, userId))) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
    }
    Object.assign(user, updateBody);
    await user.save();
    return user;
};

module.exports = {
    createUser,
    getUserById,
    updateUserById
};
  