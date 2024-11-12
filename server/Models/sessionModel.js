const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema(
    {members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]},
    {timestamps: true},
);

const sessionModel = mongoose.model("Session", sessionSchema);

module.exports = sessionModel;