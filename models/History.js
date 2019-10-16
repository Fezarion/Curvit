const mongoose = require("mongoose");
const { Schema } = mongoose;

const historySchema = new Schema({
    title: String,
    startDate: Date,
    endDate: Date,
    description: String,
    position: String
});

module.exports = historySchema;
