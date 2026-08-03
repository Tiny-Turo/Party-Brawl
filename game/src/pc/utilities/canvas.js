// Canvas
window.canvas = document.getElementById("main-canvas");
window.ctx = canvas.getContext("2d");

ctx.translate(canvas.width / 2, canvas.height / 2);

function resize() {
  const container = canvas.parentElement;

  const containerWidth = container.clientWidth;
  const containerHeight = container.clientHeight;

  const canvasAspect = 1920 / 1080;
  const containerAspect = containerWidth / containerHeight;

  if (containerAspect > canvasAspect) {
    canvas.style.height = "100%";
    canvas.style.width = "auto";

    canvas.height = 1080;

    ctx.translate(-canvas.width / 2, -canvas.height / 2);
    canvas.width = canvas.height * containerAspect;
    ctx.translate(canvas.width / 2, canvas.height / 2);
  } else {
    canvas.style.width = "100%";
    canvas.style.height = "auto";

    canvas.width = 1920;

    ctx.translate(-canvas.width / 2, -canvas.height / 2);
    canvas.height = canvas.width / containerAspect;
    ctx.translate(canvas.width / 2, canvas.height / 2);
  }
}

resize();
window.addEventListener("resize", resize);
