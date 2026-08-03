import { io } from "socket.io-client";
const socket = io("ws://localhost:8080/");

export let roomUnavailable = false;

export function updateInput(input) {
  if (roomUnavailable) return;

  socket.emit("input", { input });
}

export function joinRoom(roomCode, name) {
  socket.emit("joinroom", { roomCode, name });
}

export function readyUp() {
  socket.emit("readyup");
}

socket.on("sessionend", () => {
  roomUnavailable = true;

  const dialog = document.getElementById("room-unavailable-dialog");
  dialog.showModal();
});
