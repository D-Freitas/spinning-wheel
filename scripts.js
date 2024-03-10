const canvas = document.getElementById("main-canvas");
const ctx = canvas.getContext("2d");

const coordinates = {
  centerX: window.innerWidth / 2,
  centerY: window.innerHeight / 2,
};

const radius = 700

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const easeInOutQuad = (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", () => {
  coordinates.centerX = window.innerWidth / 2;
  coordinates.centerY = window.innerHeight / 2;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

const spinGraphics = new Image();
spinGraphics.src = "./assets/images/spin-graphic.png";

let rotationAngle = 0;
let spinned = false;
let currentRotationCount = 0;

let rotationCount = 0

document.getElementById('bet').addEventListener("click", () => {
  rotationCount = randomIntFromInterval(5, 10);
  spinned = true;
});

function drawRainbowCircle() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.save();
  ctx.translate(coordinates.centerX, coordinates.centerY);

  const easingFactor = easeInOutQuad(currentRotationCount / (rotationCount * 2 * Math.PI));
  const easedRotation = easingFactor * rotationCount * 2 * Math.PI;

  ctx.rotate(easedRotation);
  ctx.drawImage(spinGraphics, -radius / 2, -radius / 2, radius, radius);
  ctx.restore();

  if (spinned) {
    currentRotationCount += 0.1

    if (currentRotationCount >= rotationCount * (Math.PI * 2)) {
      spinned = false;
      currentRotationCount = 0;
    }
  }

  requestAnimationFrame(drawRainbowCircle);
}

spinGraphics.addEventListener("load", drawRainbowCircle);
