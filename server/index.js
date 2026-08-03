const http = require("http").createServer();
const io = require("socket.io")(http, { cors: { origin: "*" } });

const roomsPCSocket = {};
io.on("connection", (socket) => {
  // console.log("A user connected");

  socket.on("input", ({ input }) => {
    console.log(input);
    roomsPCSocket[socket.data.roomCode].emit("input", { input });
  });

  socket.on("joinroom", ({ roomCode, name }) => {
    console.log(`"${name}" joined room at: "${roomCode}"`);
    if (!roomsPCSocket[roomCode]) {
      console.log(`but session was ended as room had no leader`);
      socket.emit("sessionend");
      return;
    }

    socket.join(roomCode);
    socket.data.roomCode = roomCode;

    roomsPCSocket[roomCode].emit("playerjoined", { id: socket.id });
  });

  socket.on("createroom", ({ roomCode }) => {
    console.log(`Room created at: "${roomCode}"`);

    socket.join(roomCode);
    socket.data.roomCode = roomCode;
    roomsPCSocket[roomCode] = socket;
  });

  socket.on("disconnect", function () {
    if (
      roomsPCSocket[socket.data.roomCode] &&
      socket.id == roomsPCSocket[socket.data.roomCode].id
    ) {
      io.emit("sessionend");
    } else {
      io.emit("playerleft", { id: socket.id });
    }
  });
});

http.listen(8080, () => console.log("Server listening on port 8080"));
