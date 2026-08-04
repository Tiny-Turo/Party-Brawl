let grass = [];
const grassTypesAmount = 3;

const grassSprites = new Image();
grassSprites.src = "/sprites/grass.png";

export function draw() {
  for (const [i, patch] of grass.entries()) {
    const CELL_SIZE = 128;

    ctx.drawImage(
      grassSprites,
      patch.type * CELL_SIZE,
      0,
      CELL_SIZE,
      CELL_SIZE,
      patch.position.x - CELL_SIZE / 2,
      patch.position.y - CELL_SIZE,
      CELL_SIZE,
      CELL_SIZE,
    );
  }
}

export function load() {
  for (let i = 0; i < 5; i++) {
    grass.push({
      position: randomPositionInSpawn(),
      type: randomInt(0, grassTypesAmount),
    });
  }
}
