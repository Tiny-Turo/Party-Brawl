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

  buzz: new Howl({
    src: ["/sfx/buzz.wav"],
    volume: 1,
  }),
};
