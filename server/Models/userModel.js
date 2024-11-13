const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 20,
      unique: true,
    }, 
    password: { type: String, required: true, minlength: 3, maxlength: 1000 },
    instrument: {
      type: String,
      required: true,
      enum: ["guitar", "piano", "drums", "singer", "bass"], 
      message: 'Instrument must be a valid instrument or "singer"',
    },
    isAdmin: { type: Boolean, default: false }, 
  },
  { timestamps: true }
); 

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
