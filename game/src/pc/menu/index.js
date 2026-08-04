let pressedAt = 0;

export function mouseDown() {
  pressedAt = time.time;
}

function drawBackground() {
  const spacing = 20;
  const totalLines = canvas.width;
  const totalHeight = spacing * totalLines;
  const offset = (time.time * 20) % (spacing * 2);
  ctx.save();
  ctx.translate(canvas.width / 2, 0);
  ctx.rotate(Math.PI * 0.25);
  ctx.fillStyle = "#C16E70";
  for (let i = 0; i < totalLines; i++) {
    if (i % 2 === 0) {
      const y = i * spacing + offset - totalHeight / 2;

      ctx.fillRect(-(canvas.height + canvas.width), y, (canvas.width + canvas.height) * 2, spacing);
    }
  }
  ctx.restore();
}

export function update() {
  drawBackground();

  ctx.fillStyle = "#030027";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  ctx.font = "120px boldone";
  let y = 0;
  if (pressedAt !== 0) y = ((time.time - pressedAt) / 0.3) * (canvas.height / 2);

  ctx.fillText("Press to start!", 0, y);

  if (pressedAt !== 0) {
    let opacity = (time.time - pressedAt - 0.5) / 0.5;

    ctx.fillStyle = `rgba(3, 0, 39,${opacity})`;
    if (opacity >= 1) changeScene("lobby");

    ctx.fillRect(-canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);
  }
}

export function load() {}

export function unload() {}
