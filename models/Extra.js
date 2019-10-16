const mongoose = require("mongoose");
const { Schema } = mongoose;

const extraSchema = new Schema({
    title: String,
    detail: String
});

module.exports = extraSchema;
