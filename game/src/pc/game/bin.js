let binPosition = { x: canvas.width / 2, y: 0 };
let binOpenedAt = 0;
let binClosedAt = 0;

export function update(players) {
  binPosition = { x: canvas.width / 2 - 128, y: -canvas.height / 2 + 256 + 32 };

  let binIsOpen = false;

  for (const player of Object.values(players)) {
    if (player.itemHeldType !== -1 && isEllipsesColliding(player.position, binPosition, 128)) {
      player.itemHeldType = -1;

      sfx.binThrow.play();
    }

    if (!binIsOpen && isEllipsesColliding(player.position, binPosition, 256)) {
      binIsOpen = true;

      if (binOpenedAt === 0) {
        sfx.woosh.play();
        binOpenedAt = time.time;
      }
    }
  }

  if (binIsOpen === false) {
    if (binOpenedAt !== 0) {
      binClosedAt = time.time;
      sfx.woosh.play();
    }
    binOpenedAt = 0;
  }

  drawBin();
}

export const binSprite = new Image();
binSprite.src = "/sprites/bin.png";
function drawBin() {
  const CELL_SIZE = 256;
  const FPS = 24;

  let cellX = Math.floor((time.time - binOpenedAt) / (1 / FPS));
  if (binOpenedAt === 0) {
    cellX = 6 - Math.floor((time.time - binClosedAt) / (1 / FPS));
  }
  if (cellX > 6) cellX = 6;
  if (cellX < 0) cellX = 0;

  pushToRenderQueue(
    binSprite,
    cellX * CELL_SIZE,
    0,
    CELL_SIZE,
    CELL_SIZE,
    binPosition.x - CELL_SIZE / 2,
    binPosition.y - CELL_SIZE,
    CELL_SIZE,
    CELL_SIZE,
    binPosition.y,
  );
}
