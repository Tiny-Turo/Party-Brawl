import { itemSprites, itemTypesAmount } from "./items";

let currentRequest = [];
let requestCompleted = 0;

const bubbleSprite = new Image();
bubbleSprite.src = "/sprites/bubble.png";

export function pushedInHole(itemType) {
  if (itemType === currentRequest[requestCompleted].type) {
    requestCompleted++;
  } else {
    requestCompleted = 0;
  }
}

export function draw() {
  const bubblePosition = { x: -canvas.width / 2 + 32, y: -canvas.height / 2 };

  const BUBBLE_WIDTH = 128;
  const BUBBLE_HEIGHT = 256;

  //Bubble start
  pushToRenderQueue(bubbleSprite, 0, 0, BUBBLE_WIDTH, BUBBLE_HEIGHT, bubblePosition.x, bubblePosition.y, BUBBLE_WIDTH, BUBBLE_HEIGHT, 1000000000);

  for (const [i, item] of currentRequest.entries()) {
    if (i !== 0)
      pushToRenderQueue(
        bubbleSprite,
        BUBBLE_WIDTH,
        0,
        BUBBLE_WIDTH,
        BUBBLE_HEIGHT,
        bubblePosition.x + BUBBLE_WIDTH * i,
        bubblePosition.y,
        BUBBLE_WIDTH,
        BUBBLE_HEIGHT,
        1000000000,
      );

    const CELL_SIZE = 128;

    pushToRenderQueue(
      itemSprites,
      item.type * CELL_SIZE,
      requestCompleted > i ? CELL_SIZE * 2 : CELL_SIZE,
      CELL_SIZE,
      CELL_SIZE,
      bubblePosition.x + BUBBLE_WIDTH * (i + 0.5),
      bubblePosition.y + BUBBLE_WIDTH / 2,
      CELL_SIZE,
      CELL_SIZE,
      2000000000,
    );
  }

  pushToRenderQueue(
    bubbleSprite,
    BUBBLE_WIDTH * 2,
    0,
    BUBBLE_WIDTH,
    BUBBLE_HEIGHT,
    bubblePosition.x + BUBBLE_WIDTH * currentRequest.length,
    bubblePosition.y,
    BUBBLE_WIDTH,
    BUBBLE_HEIGHT,
    1000000000,
  );
}

export function load() {
  for (let i = 0; i < 3; i++) {
    currentRequest.push({
      type: randomInt(0, itemTypesAmount),
    });
  }
}
