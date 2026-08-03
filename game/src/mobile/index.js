import nipplejs from "nipplejs";
import { joinRoom, updateInput } from "./connections.js";

const form = document.getElementById("name-form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  startJoysticks();

  const formData = new FormData(e.target);
  const name = formData.get("name");

  const params = new URLSearchParams(window.location.search);
  const roomCode = params.get("roomcode");

  joinRoom(roomCode, name);
  form.remove();
});

function startJoysticks() {
  const options = {
    size: 100,
    fadeTime: 100,
    color: { back: "#151E3F", front: "#030027" },
    follow: true,
    // multitouch: true,
    // maxNumberOfJoysticks: 2,
  };

  const joystickManager = nipplejs.create(options);
  let input = {};

  joystickManager.on("move", function (evt) {
    // input[evt.data.instance.index] = evt.data.vector;
    input = evt.data.vector;
    updateInput(input);
  });

  joystickManager.on("end", function (evt) {
    // input[evt.data.index] = { x: 0, y: 0 };
    input = { x: 0, y: 0 };
    updateInput(input);
  });
}

console.log("mobile");
