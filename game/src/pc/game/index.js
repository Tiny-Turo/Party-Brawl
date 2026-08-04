import { players } from "../connections";
import { drawAll } from "./renderqueue";
import * as Players from "./players";
import * as Items from "./items";
import * as Hole from "./hole";
import * as Request from "./request";

import * as Grass from "./grass";

export function update() {
  Players.update(players, Hole.holePosition);
  Items.update(players);
  Hole.update(players);

  Request.draw();
  Grass.draw();

  // spawnAreas.forEach((area) => {
  //   ctx.fillStyle = "rgba(0, 0, 0, 0.24)";
  //   ctx.fillRect(area.x, area.y, area.width, area.height);
  // });

  drawAll();
}

export function load() {
  Items.load();
  Request.load();

  Grass.load();
}

export function unload() {}
