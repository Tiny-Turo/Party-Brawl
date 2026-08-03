import nipplejs from "nipplejs";
import "./sfx.js";
import { joinRoom, readyUp, updateInput } from "./connections.js";

const form = document.getElementById("name-form");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);
  const name = formData.get("name");
  if (name.length < 3) {
    shakeInput();
    return;
  }

  const params = new URLSearchParams(window.location.search);
  const roomCode = params.get("roomcode");

  joinRoom(roomCode, name);
  form.remove();

  const dialog = document.getElementById("press-to-readyup-dialog");
  dialog.showModal();
});

const input = document.getElementById("name-input");

input.addEventListener("input", (e) => {
  const previousValue = input.value;
  input.value = input.value.replace(/[^a-zA-Z0-9]/g, "");
  input.value = input.value.slice(0, 9);
  if (input.value === previousValue) {
    sfx.hover.play();
  } else {
    shakeInput();
  }
});

const button = document.getElementById("readyup-button");

button.addEventListener("click", (e) => {
  sfx.click.play();
  startJoysticks();
  e.preventDefault();

  const dialog = document.getElementById("press-to-readyup-dialog");
  dialog.close();

  readyUp();
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

function shakeInput() {
  input.classList.add("shake");
  setTimeout(() => {
    input.classList.remove("shake");
  }, 500);
}

console.log("mobile");
