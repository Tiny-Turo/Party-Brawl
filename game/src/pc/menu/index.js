import QRCode from "qrcode";

const qrCanvas = document.getElementById("qr-canvas");
const roomID = "sideshowbob";

export function update() {
  ctx.fillStyle = "#DC9E82";
  ctx.fillRect(-canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);

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
  ctx.fillText("20", 0, qrCanvas.height / 2 + qrCanvasPadding * 8);
}

export function load() {
  const link = `http://192.168.178.194:5173/mobile/?id=${roomID}`;
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
}

export function unload() {}
