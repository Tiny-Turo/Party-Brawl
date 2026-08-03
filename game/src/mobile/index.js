import "./connections.js";
import nipplejs from "nipplejs";

const form = document.getElementById("name-form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  startJoysticks();
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
  });

  joystickManager.on("end", function (evt) {
    // input[evt.data.index] = { x: 0, y: 0 };
    input = { x: 0, y: 0 };
  });
}

console.log("mobile");
