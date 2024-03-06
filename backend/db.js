const mongoose = require("mongoose");
const { MONGODB_URI } = require("../.env")

mongoose.connect("mongodb://localhost:27017/pokemon"); //FIXME: .env not works

// const db = mongoose.connection;

module.exports = mongoose.connection