const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const http = require('http');
const socketIo = require('socket.io');

const userRoute = require("./Routes/userRoute")
const songsRoute = require("./Routes/songsRoute");
const sessionRoute = require("./Routes/sessionRoute");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:5173",  // הכתובת של הלקוח שלך
    methods: ["GET", "POST"],
  }
});
require("dotenv").config();

const corsOptions = {
  origin: "http://localhost:5173",  // הכתובת של הלקוח שלך
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"],
};

app.use(express.json());
app.use(cors(corsOptions));
app.use("/users", userRoute);
app.use("/songs", songsRoute);
app.use("/sessions", sessionRoute);

app.get("/", (req,res) => {
    res.send("Welcome our JaMoveo App")
})

const port = process.env.PORT || 5000;
const uri = process.env.ATLAS_URI;



mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MondoDB connection established"))
  .catch((error) =>
    console.log("MongoDB connection fail: ", error.message)
  );

const usersInRoom = new Set();
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  // האזנה לפעולה של האדמין
  socket.on('adminQuit', (data) => {
    console.log('Admin triggered quit:', data);

    // שליחה של האירוע לכל המשתמשים
    io.emit('quitAction', data);
  });

  socket.on('adminSelectSong', (data) => {
    console.log('Admin adminSelected Song:', data);
    if (data && data.action === 'songSelected' && data.song) {
      // שליחה של האירוע לכל המשתמשים
      io.emit('adminSelectSong', data.song);
    }
  });

  socket.on('join-rehearsal', (userId) => {
    if (usersInRoom.has(userId)) {
      console.log(`User ${userId} is already in the rehearsal room.`);
      return;  // Do not add them again
    }
      console.log(`User ${userId} joined the rehearsal room`);
      socket.join('rehearsal-room');
      usersInRoom.add(userId);  // Add user to the set

      io.to('rehearsal-room').emit('user_joined', userId);
  });
  
  socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
      usersInRoom.delete(socket.id);
  });
});
 server.listen(port, (req, res) => {
  console.log(`Server running on port: ${port}`);
});


