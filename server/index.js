const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { Server } = require("socket.io");

const userRoute = require("./Routes/userRoute");
const songsRoute = require("./Routes/songsRoute");
const sessionRoute = require("./Routes/sessionRoute");

const app = express();

require("dotenv").config();

app.use(express.json());

app.use(cors());
app.use("/users", userRoute);
app.use("/songs", songsRoute);
app.use("/sessions", sessionRoute);

app.get("/", (req, res) => {
  res.send("Welcome our JaMoveo App");
});

const port = process.env.PORT || 5000;
const uri = process.env.ATLAS_URI;

const expressServer = app.listen(port, (req, res) => {
  console.log(`Server running on port: ${port}`);
});

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MondoDB connection established"))
  .catch((error) => console.log("MongoDB connection fail: ", error.message));

const io = new Server(expressServer, {
  cors: { origin: process.env.CLIENT_URL, methods: ["GET", "POST"] },
});

let usersInRoom = [];

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on("adminQuit", (data) => {
    console.log("Admin triggered quit:", data);

    io.emit("adminQuit", data);
  });

  socket.on("adminSelectSong", (data) => {
    console.log("Admin adminSelected Song:", data);
    if (data && data.action === "songSelected" && data.song) {
      io.emit("adminSelectSong", data.song);
    }
  });

  socket.on("join-rehearsal", (userId) => {
    if (!usersInRoom.some((user) => user._id === userId)) {
      usersInRoom.push({ userId, socketId: socket.id });
    }
    console.log("usersInRoom", usersInRoom);

    io.emit("getOnlineUsers", usersInRoom);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
    usersInRoom = usersInRoom.filter((user) => user.socketId !== socket.id);

    io.emit("getOnlineUsers", usersInRoom);
  });
});
