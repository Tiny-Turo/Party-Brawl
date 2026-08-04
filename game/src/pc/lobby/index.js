import QRCode from "qrcode";
import { closeRoom, createRoom, players } from "../connections";

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

let enteredAt = 0;
export function update() {
  drawBackground();

  ctx.fillStyle = "#DC9E82";
  ctx.fillRect(-canvas.width / 2, -canvas.height / 2, canvas.width / 2, canvas.height);

  const qrCanvasPadding = 32;
  const qrPosition = { x: -canvas.width / 4, y: 0 };
  ctx.fillStyle = "#F2F3D9";

  ctx.beginPath();
  ctx.roundRect(
    qrPosition.x - qrCanvas.width / 2 - qrCanvasPadding,
    qrPosition.y - qrCanvas.height / 2 - qrCanvasPadding,
    qrCanvas.width + qrCanvasPadding * 2,
    qrCanvas.height + qrCanvasPadding * 2,
    qrCanvasPadding,
  );
  ctx.fill();

  ctx.drawImage(qrCanvas, qrPosition.x - qrCanvas.width / 2, qrPosition.y - qrCanvas.height / 2);

  ctx.fillStyle = "#030027";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  ctx.font = "120px boldone";
  ctx.fillText("Scan to", qrPosition.x, -qrCanvas.height / 2 - qrCanvasPadding * 8);

  ctx.font = "160px boldone";
  ctx.fillText("join!", qrPosition.x, -qrCanvas.height / 2 - qrCanvasPadding * 4);

  ctx.font = "80px boldone";
  ctx.fillText("Ready up", qrPosition.x, qrCanvas.height / 2 + qrCanvasPadding * 4);
  ctx.fillText("when everyone", qrPosition.x, qrCanvas.height / 2 + qrCanvasPadding * 6.5);
  ctx.fillText("has joined", qrPosition.x, qrCanvas.height / 2 + qrCanvasPadding * 9);

  ctx.font = "120px boldone";
  ctx.fillText("Joined:", canvas.width / 4, -qrCanvas.height / 2 - qrCanvasPadding * 8);

  let isEveryoneReady = true;
  for (const [i, player] of Object.values(players).entries()) {
    if (player.isReady) ctx.fillStyle = "#030027";
    else {
      ctx.fillStyle = "rgba(0, 0, 0, 0.4)";
      isEveryoneReady = false;
    }

    ctx.font = "80px boldone";
    ctx.fillText(player.name, canvas.width / 4, -qrCanvas.height / 2 - qrCanvasPadding * 3 + i * qrCanvasPadding * 3);
  }

  if (isEveryoneReady && Object.keys(players).length > 0) {
    changeScene("game");
    closeRoom();
  }

  if (enteredAt !== 0) {
    let opacity = (time.time - enteredAt - 0.5) / 0.5;

    ctx.fillStyle = `rgba(3, 0, 39,${1 - opacity})`;
    if (opacity <= 0) opacity = 0;

    ctx.fillRect(-canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);
  }
}

export function load() {
  enteredAt = time.time;
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

  music.lobby.play();
}

export function unload() {
  music.lobby.stop();
}
