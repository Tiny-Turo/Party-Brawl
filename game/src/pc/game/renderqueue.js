let renderQueue = [];

export function drawAll() {
  renderQueue.sort((a, b) => a.zIndex - b.zIndex);

  for (const item of renderQueue) {
    if (!(item.image instanceof HTMLImageElement) || !item.image.complete || item.image.naturalWidth === 0) {
      continue;
    }

    ctx.save();

    if (item.flip) {
      ctx.scale(-1, 1);
      ctx.drawImage(item.image, item.sx, item.sy, item.sWidth, item.sHeight, -item.dx - item.dWidth, item.dy, item.dWidth, item.dHeight);
    } else {
      ctx.drawImage(item.image, item.sx, item.sy, item.sWidth, item.sHeight, item.dx, item.dy, item.dWidth, item.dHeight);
    }

    ctx.restore();
  }

  renderQueue = [];
}

window.pushToRenderQueue = function (image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight, zIndex = 0, flip = false) {
  renderQueue.push({
    image,
    sx,
    sy,
    sWidth,
    sHeight,
    dx,
    dy,
    dWidth,
    dHeight,
    zIndex,
    flip,
  });
};
