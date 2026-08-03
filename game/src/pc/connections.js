import { io } from "socket.io-client";
const socket = io("ws://localhost:8080/");

export let playersInRoom = 0;

socket.on("input", ({ input }) => {
  console.log(input);
});

socket.on("playerjoined", ({ id }) => {
  console.log(id);
  playersInRoom++;
});

socket.on("playerleft", ({ id }) => {
  console.log(id);
  playersInRoom--;
});

export function createRoom(roomCode) {
  socket.emit("createroom", { roomCode });
}
