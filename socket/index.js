const {Server} = require("socket.io");

const io = new Server({cors:"http://localhost:5173/",    origin: "http://localhost:5173",
    methods: ["GET", "POST"]});

let usersInRoom = [];

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  // האזנה לפעולה של האדמין
  socket.on('adminQuit', (data) => {
    console.log('Admin triggered quit:', data);
    // שליחה של האירוע לכל המשתמשים
    io.emit('adminQuit', data);
  });

  socket.on('adminSelectSong', (data) => {
    console.log('Admin adminSelected Song:', data);
    if (data && data.action === 'songSelected' && data.song) {
      // שליחה של האירוע לכל המשתמשים
      io.emit('adminSelectSong', data.song);
    }
  });

  socket.on('join-rehearsal', (userId) => {
    if(!usersInRoom.some(user => user._id === userId)){
        usersInRoom.push({userId, socketId: socket.id,
        });
    }  
    console.log('usersInRoom', usersInRoom);

    io.emit('getOnlineUsers', usersInRoom);
});

  socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
      usersInRoom = usersInRoom.filter(user=>user.socketId !== socket.id);

      io.emit('getOnlineUsers', usersInRoom);
  });

});

io.listen(3000);