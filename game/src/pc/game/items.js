export let items = [];
export const itemTypesAmount = 5;
export const itemsAtOnce = 5;

export function update(players) {
  let indexesToDestroy = new Set();
  for (const [i, item] of items.entries()) {
    for (const player of Object.values(players)) {
      if (player.itemHeldType !== -1) continue;

      if (isEllipsesColliding(player.position, item.position, 128)) {
        player.itemHeldType = item.type;
        indexesToDestroy.add(i);

        sfx.pickup.play();
      }
    }

    drawItem(item.position, item.type);
  }

  items = items.filter((_, i) => !indexesToDestroy.has(i));
}

export function load() {
  for (let i = 0; i < itemsAtOnce; i++) {
    newItem();
  }
}

export function newItem() {
  items.push({
    position: randomPositionInSpawn(),
    type: randomInt(0, itemTypesAmount),
  });
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
