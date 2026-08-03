import { players } from "../connections";

export function update() {
  ctx.fillStyle = "#C16E70";
  for (const [i, player] of Object.values(players).entries()) {
    player.position.x += player.input.x * time.deltaTime * 500;
    player.position.y -= player.input.y * time.deltaTime * 500;

    ctx.beginPath();
    ctx.arc(player.position.x, player.position.y, 50, 0, Math.PI * 2);
    ctx.fill();
  }
}

export function load() {}

export function unload() {}
