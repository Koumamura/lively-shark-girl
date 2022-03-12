/** @type {HTMLCanvasElement} */
const canvas = document.getElementById("canvas");

const updateCanvasSizes = () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
};

window.addEventListener("load", updateCanvasSizes);
window.addEventListener("resize", updateCanvasSizes);

const MousePosition = {
  x: 0,
  y: 0,
};

/**
 * @param {MouseEvent} event
 */
const updateMousePosition = (event) => {
  MousePosition.x = event.pageX;
  MousePosition.y = event.pageY;
};

document.addEventListener("mousemove", updateMousePosition);
document.addEventListener("mouseenter", updateMousePosition, false);

const ctx = canvas.getContext("2d");

const createImage = () => document.createElement("img");

const ASSETS = {
  bubble: createImage(),
  coral: createImage(),
  follow: createImage(),
  eyesBG: createImage(),
  girl: createImage(),
};

function init() {
  ASSETS.bubble.src = "/assets/images/bubble.png";
  ASSETS.coral.src = "/assets/images/coral.png";
  ASSETS.follow.src = "/assets/images/follow.png";
  ASSETS.eyesBG.src = "/assets/images/eyes-background.png";
  ASSETS.girl.src = "/assets/images/girl.png";

  requestAnimationFrame(draw);
}

const createStaticBackgroundDrawer = () => {
  let bubbleRatio = 0;
  let coralRatio = 0;

  const { coral, bubble } = ASSETS;

  /**
   * Draws the static background, which contains bubble and coral
   * @param {CanvasRenderingContext2D} ctx
   */
  return (ctx) => {
    if (!bubbleRatio || !coralRatio) {
      bubbleRatio = bubble.height / bubble.width;
      coralRatio = coral.height / coral.width;
    }

    const bubbleWidth = canvas.height / bubbleRatio;
    const coralWidth = canvas.height / coralRatio;

    ctx.drawImage(bubble, 0, 0, bubbleWidth, canvas.height);
    ctx.drawImage(
      coral,
      canvas.width - coralWidth,
      0,
      coralWidth,
      canvas.height
    );
  };
};

const drawStaticBackground = createStaticBackgroundDrawer();

/**
 * Draws girl
 * @param {CanvasRenderingContext2D} ctx
 */
const drawGirl = (ctx) => {
  const { girl } = ASSETS;

  ctx.drawImage(
    girl,
    canvas.width / 2 - canvas.height / 2,
    0,
    canvas.height,
    canvas.height
  );
};

init();

/**
 * @param {number} x
 * @param {number} y
 */
const percent = (x, y) => {
  return (x / 100) * y;
};

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawStaticBackground(ctx);

  let gradient = ctx.createLinearGradient(
    0,
    canvas.height / 2.8,
    0,
    canvas.height / 2
  );

  gradient.addColorStop(0, "#babfcc");
  gradient.addColorStop(1, "#ffffff");

  ctx.fillStyle = gradient;
  ctx.beginPath();

  const center = canvas.width / 2;

  const thirteenPercent = percent(9, canvas.height);

  /**
   * @param {number} x
   */
  const drawEyeball = (x) => {
    ctx.arc(
      center + x,
      canvas.height / 2 - thirteenPercent / 2,
      thirteenPercent * 0.7,
      0,
      2 * Math.PI
    );
  };

  drawEyeball(-thirteenPercent);
  drawEyeball(thirteenPercent);

  ctx.fill();

  drawGirl(ctx);

  requestAnimationFrame(draw);
}
