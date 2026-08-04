import "./maths";
import "./logic";
import "./sfx";
import "./canvas";

window.spawnAreas = [
  { x: -canvas.width / 2 + 64, y: 128 + 64, width: canvas.width - 128, height: canvas.height / 2 - 192 - 64 },
  { x: -canvas.width / 2 + 64, y: -canvas.height / 2 + 320, width: canvas.width - 448, height: canvas.height / 2 - 320 - 128 - 64 },
  { x: -128, y: -canvas.height / 2 + 64, width: canvas.width / 2 - 480 - -128, height: 256 },
  {
    x: -canvas.width / 2 + 64,
    y: -canvas.height / 2 + 320 + canvas.height / 2 - 320 - 128 - 64,
    width: canvas.width / 2 - 256 - 256 + 64,
    height: 128 + 64 - (-canvas.height / 2 + 320 + canvas.height / 2 - 320 - 128 - 64),
  },
  {
    x: 128 + 256,
    y: -canvas.height / 2 + 320 + canvas.height / 2 - 320 - 128 + 64,
    width: canvas.width / 2 - 512 + 64,
    height: 128 + 64 - (-canvas.height / 2 + 320 + canvas.height / 2 - 320 - 128 + 64),
  },
];
