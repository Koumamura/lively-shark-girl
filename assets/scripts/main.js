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

const { PI } = Math;

const ctx = canvas.getContext("2d");

const createImage = () => document.createElement("img");

const ASSETS = {
  bubble: createImage(),
  coral: createImage(),
  girl: createImage(),
  left_eye: createImage(),
  right_eye: createImage(),
};

function init() {
  ASSETS.bubble.src = "/assets/images/bubble.png";
  ASSETS.coral.src = "/assets/images/coral.png";
  ASSETS.girl.src = "/assets/images/girl.png";
  ASSETS.left_eye.src = "/assets/images/left-eye.png";
  ASSETS.right_eye.src = "/assets/images/right-eye.png";

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
  // gradient.addColorStop(1, "red");

  ctx.fillStyle = gradient;
  ctx.beginPath();

  const center = canvas.width / 2;

  const thirteenPercent = percent(9, canvas.height);

  const radius = thirteenPercent * 0.7;
  const diameter = radius * 2;

  /**
   * @param {number} x
   */
  const drawEyeball = (x) => {
    ctx.arc(
      center + x,
      canvas.height / 2 - thirteenPercent / 2,
      radius,
      0,
      2 * PI
    );
  };

  // console.log(radius);
  // console.log(PI * radius * 2);

  drawEyeball(-thirteenPercent);
  drawEyeball(thirteenPercent);

  ctx.fill();

  let { x, y } = MousePosition;

  x /= canvas.width;
  y /= canvas.height;

  console.log({ x, y });

  if (y < 0.37) {
    y = 0.37;
  } else if (y > 0.75) {
    y = 0.75;
  }

  if (x < 0.23) {
    x = 0.23;
  } else if (x > 0.77) {
    x = 0.77;
  }

  x *= diameter;
  y *= diameter;

  const yOffset = percent(36.5, canvas.height);

  ctx.drawImage(
    ASSETS.left_eye,
    percent(36.25, canvas.width) + x,
    yOffset + y,
    radius,
    radius
  );

  ctx.drawImage(
    ASSETS.right_eye,
    percent(49, canvas.width) + x,
    yOffset + y,
    radius,
    radius
  );

  drawGirl(ctx);

  requestAnimationFrame(draw);
}
