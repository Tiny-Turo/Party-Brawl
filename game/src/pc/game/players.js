import { itemSprites } from "./items";

export function update(players, holePosition) {
  for (const [i, player] of Object.values(players).entries()) {
    player.position.x += player.input.x * time.deltaTime * 16 * 24;
    player.position.y -= player.input.y * time.deltaTime * 16 * 24;

    collideWithHole(player, holePosition);

    drawPlayer(player, i);
  }
}

const playerSprite = new Image();
playerSprite.src = "/sprites/player.png";
const playerTypeOffset = randomInt(0, 5);

function drawPlayer(player, index) {
  const position = player.position;
  const direction = player.input.x;
  const itemHeldType = player.itemHeldType;

  let CELL_SIZE = 192;
  const FPS = 24;
  const framesAmount = 16;
  let cellX = Math.floor(time.time / (1 / FPS)) % framesAmount;
  let cellY = ((index + playerTypeOffset) % 5) * 2;

  if (direction === 0) cellY++;

  if ((cellX == 1 || cellX == 9) && player.lastCellX != cellX && direction != 0) {
    player.lastCellX = cellX;
    sfx.footstep.play();
    sfx.footstep.rate(random(0.9, 1.1));
  }

  pushToRenderQueue(
    playerSprite,
    cellX * CELL_SIZE,
    cellY * CELL_SIZE,
    CELL_SIZE,
    CELL_SIZE,
    position.x - CELL_SIZE / 2,
    position.y - CELL_SIZE,
    CELL_SIZE,
    CELL_SIZE,
    position.y,
    direction < 0,
  );

  ctx.fillStyle = "#C16E70";
  ctx.beginPath();
  ctx.ellipse(position.x, position.y, CELL_SIZE / 2, CELL_SIZE / 4, 0, 0, Math.PI * 2);
  ctx.fill();

  if (itemHeldType !== -1) {
    CELL_SIZE = 128;
    pushToRenderQueue(
      itemSprites,
      itemHeldType * CELL_SIZE,
      0,
      CELL_SIZE,
      CELL_SIZE,
      position.x - CELL_SIZE / 2,
      position.y - CELL_SIZE * 2.3,
      CELL_SIZE,
      CELL_SIZE,
      position.y,
    );
  }
}

function collideWithHole(player, holePosition) {
  const position = player.position;

  const playerRadius = 192 / 2;
  const holeRadius = 128 / 2;

  let dx = position.x - holePosition.x;
  let dy = (position.y - holePosition.y) * 2;

  let dist = Math.hypot(dx, dy);
  if (dist === 0) {
    dx = 1;
    dy = 0;
    dist = 1;
  }

  const nx = dx / dist;
  const ny = dy / dist;

  const r = playerRadius + holeRadius;
  const overlapDepth = r - dist;
  if (overlapDepth <= 0) return;

  player.position.x += nx * overlapDepth;
  player.position.y += ny * overlapDepth;
}
