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
    return db.User.findByPk(id);
};

const getUserByEmail = async (email) => {
    return db.User.findOne({ where: { email: email } });
};

const updateUserById = async (userId, updateBody) => {
    const user = await db.User.findByPk(userId);
    if (!user) {
        throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }
    user.password = updateBody.password;
    await user.save();
    return user;
};

module.exports = {
    createUser,
    getUserById,
    getUserByEmail,
    updateUserById
};
  