const db = require("../models");
const bcrypt = require("bcrypt");
const User = db.user;


const createUser = async (params) => {
    const {firstname, lastname, username, email, password} = params;
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    const user = {
        firstname,
        lastname,
        username,
        email,
        password: hash
    }

    const [row, created] = await User.findOrCreate({
        where   : {email: user.email},
        defaults: user,
    });
    if (created) {
        return row;
    }
    return null;
};


const getAllUsers = async (filter, options) => {
    const users = await User.findAll();
    return users;
};

const getUserById = async (id) => {
    return User.findOne({where: {id}});
};

const getUserByEmail = async (email) => {
    return User.findOne({where: {email}});
};


const updateUserById = async (userId, updateBody) => {
    const {firstname, lastname, username, email, password} =updateBody;
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    const user = {
        firstname,
        lastname,
        username,
        email,
        password: hash
    }

    const row = await User.update(user, {
        where: {id: userId},
    });
    return row;
};


const deleteUserById = async (userId) => {
    const user = await getUserById(userId);
    if (!user) return null
    await user.destroy();
    return user;
};

module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    getUserByEmail,
    updateUserById,
    deleteUserById,
};