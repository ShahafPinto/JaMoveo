const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoute = require("./Routes/userRoute")
const songsRoute = require("./Routes/songsRoute");

const app = express();
require("dotenv").config();

app.use(express.json());
app.use(cors());
app.use("/users", userRoute);
app.use("/songs", songsRoute);

app.get("/", (req,res) => {
    res.send("Welcome our JaMoveo App")
})

const port = process.env.PORT || 5000;
const uri = process.env.ATLAS_URI;

app.listen(port, (req, res) => {
  console.log(`Server running on port: ${port}`);
});

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MondoDB connection established"))
  .catch((error) =>
    console.log("MongoDB connection fail: ", error.message)
  );
