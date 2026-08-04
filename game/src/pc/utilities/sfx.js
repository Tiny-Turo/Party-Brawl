import { Howl, Howler } from "howler";

window.sfx = {
  click: new Howl({
    src: ["/sfx/click.mp3"],
    volume: 1,
  }),

  hover: new Howl({
    src: ["/sfx/hover.mp3"],
    volume: 1,
  }),

  pickup: new Howl({
    src: ["/sfx/pickup.mp3"],
    volume: 1,
  }),

  footstep: new Howl({
    src: ["/sfx/footstep.mp3"],
    volume: 0.05,
  }),

  binThrow: new Howl({
    src: ["/sfx/bin-throw.mp3"],
    volume: 1,
  }),

  woosh: new Howl({
    src: ["/sfx/woosh.mp3"],
    volume: 1,
  }),
};
