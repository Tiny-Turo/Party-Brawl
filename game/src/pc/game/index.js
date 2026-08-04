import { players } from "../connections";
import { drawAll } from "./renderqueue";
import * as Players from "./players";
import * as Items from "./items";
import * as Hole from "./hole";

export function update() {
  Players.update(players, Hole.holePosition);
  Items.update(players);
  Hole.update(players);

  drawAll();
}

export function load() {
  Items.load();
}

export function unload() {}
