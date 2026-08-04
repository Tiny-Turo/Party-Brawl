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
      patch.position.y,
    );
  }
}

export function load() {
  for (let i = 0; i < 8; i++) {
    grass.push({
      position: { x: random(-canvas.width / 2, canvas.width / 2), y: random(-canvas.height / 2, canvas.height / 2) },
      type: randomInt(0, grassTypesAmount),
    });
  }
}
