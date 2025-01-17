const userModel = require("../Models/userModel");
const bcrypt = require("bcrypt"); // package to hash passwords
const jwt = require("jsonwebtoken"); // package to create JWT token
const validator = require("validator"); // package to validate password strength

// Function to create a JWT token for the user
const createToken = (_id) => {
  const jwtkey = process.env.JWT_KEY;
  return jwt.sign({ _id }, jwtkey, {
    expiresIn: "3d",
  });
};

const registerUser = async (req, res) => {
  try {
    const { name, password, instrument, isAdmin } = req.body;

    let user = await userModel.findOne({ name });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }
    if (!name || !password || !instrument) {
      return res.status(400).json({ message: "Please fill all fields" });
    }
    if (
      instrument !== "guitar" &&
      instrument !== "piano" &&
      instrument !== "drums" &&
      instrument !== "bass" &&
      instrument !== "singer"
    ) {
      return res.status(400).json({
        message:
          "Instrument must be one of: guitar, piano, drums, bass, singer",
      });
    }
    if (!validator.isStrongPassword(password)) {
      return res.status(400).json({
        message:
          "Password is not strong enough. Please ensure it includes at least one uppercase letter, one number, and one special character (e.g., !, @, #).",
      });
    }
    if (name.length < 2 || name.length > 20) {
      return res.status(400).json({ message: "Please fill correct name" });
    }
    user = new userModel({
      name,
      password,
      instrument,
      isAdmin: isAdmin || false,
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt); // hash the password

    await user.save();

    const token = createToken(user._id);

    res
      .status(200)
      .json({ _id: user._id, name, instrument, token, isAdmin: user.isAdmin });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

const loginUser = async (req, res, io) => {
  const { name, password } = req.body;
  try {
    let user = await userModel.findOne({ name });
    if (!user) {
      return res.status(400).json({ message: "Invalid name or password" });
    }

    const isValidePassword = await bcrypt.compare(password, user.password);

    if (!isValidePassword) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = createToken(user._id);
    res.status(200).json({
      _id: user._id,
      name,
      instrument: user.instrument,
      token,
      isAdmin: user.isAdmin,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

// const findUser = async (req, res) => {
//   const userId = req.params.userId;
//   try {
//     const user = await userModel.findById(userId);
//     res.status(200).json(user);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json(error);
//   }
// };

// const getUsers = async (req, res) => {
//   try {
//     const users = await userModel.find();
//     res.status(200).json(users);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json(error);
//   }
// };

module.exports = { registerUser, loginUser };
