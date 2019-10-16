const mongoose = require("mongoose");
const { Schema } = mongoose;

const contactSchema = new Schema({
    type: String,
    value: String,
    snsType: String
});

module.exports = contactSchema;
