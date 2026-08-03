import { io } from "socket.io-client";
const socket = io("ws://localhost:8080/");

socket.on("input", ({ input }) => {
  console.log(input);
});

socket.on("playerjoined", ({ id }) => {
  console.log(id);
});

socket.on("playerleft", ({ id }) => {
  console.log(id);
});

export function createRoom(roomCode) {
  socket.emit("createroom", { roomCode });
}
