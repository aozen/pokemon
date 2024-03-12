const User = require('../models/User');

const create = async (userObject) => {
    const user = await User.create(userObject);
    return user.toObject()
}

const findOneByEmail = async (email) => {
    return await User.findOne({ email }).lean();
}

module.exports = {
    create, findOneByEmail
}