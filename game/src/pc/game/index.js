import { players } from "../connections";
import { drawAll } from "./renderqueue";
import * as Players from "./players";
import * as Items from "./items";

export function update() {
  Players.update(players);
  Items.update(players);

  drawAll();
}

export function load() {
  Items.load();
}

export function unload() {}
