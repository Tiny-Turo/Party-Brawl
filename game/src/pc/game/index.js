import { players } from "../connections";
import { drawAll } from "./renderqueue";
import * as Players from "./players";
import * as Items from "./items";
import * as Hole from "./hole";

import * as Grass from "./grass";

export function update() {
  Players.update(players, Hole.holePosition);
  Items.update(players);
  Hole.update(players);
  Grass.draw();

  drawAll();
}

export function load() {
  Items.load();
  Grass.load();
}

export function unload() {}
