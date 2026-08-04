import { players } from "../connections";
import * as Items from "./items";
import { pushedInHole, resetRequest } from "./request";

export const holePosition = { x: 0, y: 0 };
export let timer = 0;
let totalTime = 15;

export function resetTimer() {
  timer = totalTime;
}

export function removeTimer() {
  timer = 0;
  score = 0;
}

export function update(players) {
  timer -= time.deltaTime;

  if (timer <= 0) {
    score = 0;
    resetRequest();
  }

  for (const player of Object.values(players)) {
    if (player.itemHeldType === -1) continue;

    if (isEllipsesColliding(player.position, holePosition, 180)) {
      pushedInHole(player.itemHeldType);
      player.itemHeldType = -1;

      if (Items.items.length < Items.itemsAtOnce) {
        Items.newItem();
      }

      sfx.pickup.play();
    }
  }

  drawHole();
}

export function load() {
  totalTime = Math.sqrt(canvas.width * canvas.width + canvas.height * canvas.height) / 100 - Object.keys(players).length * 2;
}

export const holeSprite = new Image();
holeSprite.src = "/sprites/hole.png";

export const timerSprite = new Image();
timerSprite.src = "/sprites/timer.png";

function drawHole() {
  const CELL_SIZE = 192;
  ctx.drawImage(holeSprite, holePosition.x - CELL_SIZE / 2, holePosition.y - CELL_SIZE / 2, CELL_SIZE, CELL_SIZE);

  const timerWidth = 192;
  const timerHeight = 48;

  if (timer > 0) {
    //NORMAL
    pushToRenderQueue(timerSprite, 0, 0, timerWidth, timerHeight, -timerWidth / 2, holePosition.y - CELL_SIZE, timerWidth, timerHeight, holePosition.y);

    if (timer >= totalTime / 4 || Math.sin(timer * 20) > 0)
      pushToRenderQueue(
        timerSprite,
        0,
        timerHeight,
        timerWidth * (timer / totalTime),
        timerHeight,
        -timerWidth / 2,
        holePosition.y - CELL_SIZE,
        timerWidth * (timer / totalTime),
        timerHeight,
        holePosition.y,
      );
  }
}
