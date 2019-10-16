const mongoose = require("mongoose");
const { Schema } = mongoose;

const skillSchema = new Schema({
    title: String,
    level: {
        type: Number,
        default: 1
    },
    description: String
});

module.exports = skillSchema;
