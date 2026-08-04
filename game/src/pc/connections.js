import { io } from "socket.io-client";
const socket = io("ws://192.168.178.194:8080/");

export let players = {};

socket.on("input", ({ id, input }) => {
  players[id].input = input;
});

socket.on("playerjoined", ({ id, name }) => {
  sfx.hover.play();
  players[id] = {
    name,
    isReady: false,
    input: { x: 0, y: 0 },
    position: randomPositionInSpawn(),
    itemHeldType: -1,
  };
});

socket.on("playerready", ({ id, name }) => {
  sfx.pickup.play();
  players[id].isReady = true;
});

socket.on("playerleft", ({ id }) => {
  delete players[id];
});

export function createRoom(roomCode) {
  socket.emit("createroom", { roomCode });
}
