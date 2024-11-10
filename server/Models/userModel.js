const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, minlength: 2, maxlength: 20 , unique: true }, // יש לוודא שהשם יהיה ייחודי
    password: { type: String, required: true, minlength: 3, maxlength: 1000 },
    instrument: {
      type: String,
      required: true,
      enum: ["guitar", "piano", "violin", "singer"], // רשימה של כלי נגינה או "זמר"
      message: 'Instrument must be a valid instrument or "singer"',
    },
  },
  { timestamps: true }
); //אם לא יהיה לי צורך בהמשך לדעת בתאריך ושעה של ביצוע עדכון יוזר אפשר להוריד את הtimestamps

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
