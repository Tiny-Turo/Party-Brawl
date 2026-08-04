import { removeTimer, resetTimer } from "./hole";
import { itemSprites, itemTypesAmount } from "./items";

let currentRequest = [];
let requestCompleted = 0;

const bubbleSprite = new Image();
bubbleSprite.src = "/sprites/bubble.png";

export function pushedInHole(itemType) {
  if (itemType === currentRequest[requestCompleted].type) {
    resetTimer();

    requestCompleted++;
    if (requestCompleted >= currentRequest.length) {
      score += currentRequest.length;

      load(randomInt(2, 5));
    }
  } else {
    removeTimer();
    requestCompleted = 0;
  }
}
export function resetRequest() {
  requestCompleted = 0;
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

    if (item.type !== -1)
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

export function load(requestLength) {
  requestCompleted = 0;
  currentRequest = [];

  for (let i = 0; i < requestLength; i++) {
    currentRequest.push({
      type: -1,
    });

    setTimeout(
      () => {
        currentRequest[i].type = randomInt(0, itemTypesAmount);
        sfx.hover.play();
      },
      (i + 1) * 200,
    );
  }
}
