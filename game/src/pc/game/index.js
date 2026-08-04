import { players } from "../connections";
import { drawAll } from "./renderqueue";
import * as Players from "./players";
import * as Items from "./items";
import * as Hole from "./hole";
import * as Bin from "./bin";

import * as Request from "./request";

import * as Grass from "./grass";

window.score = 0;
window.hiScore = localStorage.getItem("Best") || 0;

export function update() {
  Players.update(players, Hole.holePosition);
  Items.update(players);
  Hole.update(players);
  Bin.update(players);

  Request.draw();
  Grass.draw();

  // spawnAreas.forEach((area) => {
  //   ctx.fillStyle = "rgba(0, 0, 0, 0.24)";
  //   ctx.fillRect(area.x, area.y, area.width, area.height);
  // });

  if (score > hiScore) {
    localStorage.setItem("Best", score);
    hiScore = score;
  }

  ctx.fillStyle = "#030027";
  ctx.textBaseline = "bottom";

  ctx.textAlign = "start";
  ctx.font = "120px boldone";
  ctx.fillText(score, -canvas.width / 2 + 32, canvas.height / 2 - 32);

  ctx.textAlign = "end";
  ctx.font = "120px boldone";
  ctx.fillText(`HI: ${hiScore}`, canvas.width / 2 - 32, canvas.height / 2 - 32);

  drawAll();
}

export function load() {
  Hole.load();
  Items.load();
  Request.load(3);

  Grass.load();

  music.game.play();
}

export function unload() {
  music.game.stop();
}
