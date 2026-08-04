export const holePosition = { x: 0, y: 0 };

export function update(players) {
  for (const player of Object.values(players)) {
    if (player.itemHeldType === -1) continue;

    if (isEllipsesColliding(player.position, holePosition, 192)) {
      player.itemHeldType = -1;
      sfx.pickup.play();
    }
  }

  drawHole();
}

export const holeSprite = new Image();
holeSprite.src = "/sprites/hole.png";
function drawHole() {
  const CELL_SIZE = 192;
  ctx.drawImage(holeSprite, holePosition.x - CELL_SIZE / 2, holePosition.y - CELL_SIZE / 2, CELL_SIZE, CELL_SIZE);
}
