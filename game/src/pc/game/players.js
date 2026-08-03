import { itemSprites } from "./items";

export function update(players) {
  for (const [i, player] of Object.values(players).entries()) {
    player.position.x += player.input.x * time.deltaTime * 12 * 24;
    player.position.y -= player.input.y * time.deltaTime * 12 * 24;

    drawPlayer(player);
  }
}

const playerSprite = new Image();
playerSprite.src = "/sprites/player.png";

function drawPlayer(player) {
  const position = player.position;
  const direction = player.input.x;
  const itemHeldType = player.itemHeldType;

  let CELL_SIZE = 192;
  const FPS = 24;
  const framesAmount = 16;
  let cellX = (Math.floor(time.time / (1 / FPS)) % framesAmount) + 1;

  // const cellY = Math.floor(time.time / ((1 / FPS) * 32)) % 5;

  if (direction === 0) cellX = 0;

  if ((cellX == 2 || cellX == 10) && player.lastCellX != cellX) {
    player.lastCellX = cellX;
    sfx.footstep.play();
    sfx.footstep.rate(random(0.9, 1.1));
  }

  pushToRenderQueue(
    playerSprite,
    cellX * CELL_SIZE,
    0 * CELL_SIZE,
    CELL_SIZE,
    CELL_SIZE,
    position.x - CELL_SIZE / 2,
    position.y - CELL_SIZE,
    CELL_SIZE,
    CELL_SIZE,
    position.y,
    direction < 0,
  );

  if (itemHeldType !== -1) {
    CELL_SIZE = 128;
    pushToRenderQueue(
      itemSprites,
      itemHeldType * CELL_SIZE,
      0,
      CELL_SIZE,
      CELL_SIZE,
      position.x - CELL_SIZE / 2,
      position.y - CELL_SIZE * 2,
      CELL_SIZE,
      CELL_SIZE,
      position.y,
    );
  }

  ctx.fillStyle = "#C16E70";
  ctx.beginPath();
  ctx.ellipse(position.x, position.y, CELL_SIZE / 2, CELL_SIZE / 4, 0, 0, Math.PI * 2);
  ctx.fill();
}
