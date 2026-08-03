import QRCode from "qrcode";
import { createRoom, playersInRoom } from "../connections";

const qrCanvas = document.getElementById("qr-canvas");
const roomCode = "hello";

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

  const qrCanvasPadding = 32;
  ctx.fillStyle = "#F2F3D9";
  ctx.beginPath();
  ctx.roundRect(
    -qrCanvas.width / 2 - qrCanvasPadding,
    -qrCanvas.height / 2 - qrCanvasPadding,
    qrCanvas.width + qrCanvasPadding * 2,
    qrCanvas.height + qrCanvasPadding * 2,
    qrCanvasPadding,
  );
  ctx.fill();

  ctx.drawImage(qrCanvas, -qrCanvas.width / 2, -qrCanvas.height / 2);

  ctx.fillStyle = "#030027";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  ctx.font = "160px boldone";
  ctx.fillText("scan to join", 0, -qrCanvas.height / 2 - qrCanvasPadding * 7);

  ctx.font = "80px boldone";
  ctx.fillText("users joined:", 0, qrCanvas.height / 2 + qrCanvasPadding * 4);

  ctx.font = "160px boldone";
  ctx.fillText(playersInRoom, 0, qrCanvas.height / 2 + qrCanvasPadding * 8);
}

export function load() {
  const link = `http://192.168.178.194:5173/mobile/?roomcode=${roomCode}`;
  console.log(link);
  QRCode.toCanvas(
    qrCanvas,
    link,
    {
      help: true,
      errorCorrectionLevel: "L",
      width: 280,
      color: {
        light: "#F2F3D9",
        dark: "#030027",
      },

      margin: 0,
    },
    function (error) {
      if (error) alert(error);
      console.log("success!");
    },
  );

  createRoom(roomCode);
}

export function unload() {}
