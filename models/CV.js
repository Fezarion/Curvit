const mongoose = require("mongoose");
const { Schema } = mongoose;
const Contact = require("./Contact");
const History = require("./History");
const Skill = require("./Skill");
const Extra = require("./Extra");

const cvSchema = new Schema({
    _user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    personal: {
        name: {
            type: String,
            required: true
        },
        cv: String,
        city: String,
        country: String,
        birthday: Date,
        photo: String,
        summary: String,
        title: String
    },
    contact: {
        email: [Contact],
        phone: [Contact],
        sns: [Contact],
        reference: [Contact]
    },
    history: {
        achievements: [History],
        certifications: [History],
        education: [History],
        extras: [History],
        licenses: [History],
        organizations: [History],
        research: [History],
        projects: [History],
        work: [History]
    },
    skill: {
        skills: [Skill],
        languages: [Skill],
        hobbies: [Skill]
    },
    extra: {
        extras: [Extra],
        positionWanted: String,
        availableStartDate: Date
    },
    template: {
        type: Number,
        default: 0
    }
});

mongoose.model("cv", cvSchema);
