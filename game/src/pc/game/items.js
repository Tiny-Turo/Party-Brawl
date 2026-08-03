export let items = [];
const itemTypesAmount = 5;

export function update(players) {
  let indexesToDestroy = new Set();
  for (const [i, item] of items.entries()) {
    drawItem(item.position, item.type);

    for (const player of Object.values(players)) {
      if (player.itemHeldType !== -1) continue;

      //128*128 =16384
      if (distanceSquared(player.position, item.position) < 16384) {
        player.itemHeldType = item.type;
        indexesToDestroy.add(i);

        sfx.pickup.play();
      }
    }
  }

  items = items.filter((_, i) => !indexesToDestroy.has(i));
}

export function load() {
  for (let i = 0; i < 3; i++) {
    items.push({
      position: { x: random(-canvas.width / 2, canvas.width / 2), y: random(-canvas.height / 2, canvas.height / 2) },
      type: randomInt(0, itemTypesAmount),
    });
  }
}

export const itemSprites = new Image();
itemSprites.src = "/sprites/items.png";

function drawItem(position, type) {
  const CELL_SIZE = 128;

  const offsetY = Math.sin(time.time * 2) * 6 - 16;

  pushToRenderQueue(
    itemSprites,
    type * CELL_SIZE,
    0,
    CELL_SIZE,
    CELL_SIZE,
    position.x - CELL_SIZE / 2,
    position.y - CELL_SIZE - offsetY,
    CELL_SIZE,
    CELL_SIZE,
    position.y,
  );

  ctx.fillStyle = "#C16E70";
  ctx.beginPath();
  ctx.ellipse(position.x, position.y, CELL_SIZE / 2, CELL_SIZE / 4, 0, 0, Math.PI * 2);
  ctx.fill();
}
