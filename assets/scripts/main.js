/**
 * @param {number} x
 * @param {number} y
 */
const percent = (x, y) => {
  return (x / 100) * y;
};

/** @type {HTMLCanvasElement} */
const canvas = document.getElementById("canvas");

const updateCanvasSizes = () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
};

window.addEventListener("load", updateCanvasSizes);
window.addEventListener("resize", updateCanvasSizes);

let leftEyeNegativeOffset = 180;

/**
 * https://github.com/rocksdanister/lively/wiki/Web-Guide-IV-:-Interaction#lively-properties
 * @param {string} name
 * @param {string | number} value
 */
const livelyPropertyListener = (name, value) => {
  if (name === "leftEyeNegativeOffset") {
    const float = parseFloat(value);
    leftEyeNegativeOffset = isNaN(float) || !isFinite(float) ? 0 : float;
  }
};

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
  mouth: createImage(),
};

function init() {
  ASSETS.bubble.src = "/assets/images/bubble.png";
  ASSETS.coral.src = "/assets/images/coral.png";
  ASSETS.girl.src = "/assets/images/girl.png";
  ASSETS.left_eye.src = "/assets/images/left-eye.png";
  ASSETS.right_eye.src = "/assets/images/right-eye.png";
  ASSETS.mouth.src = "/assets/images/mouth.png";

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

/**
 * Draws mouth
 * @param {CanvasRenderingContext2D} ctx
 */
const drawMouth = (ctx) => {
  const { mouth } = ASSETS;

  const width = percent(9, canvas.height);
  const scale = width / mouth.width;

  const height = mouth.height * scale;

  const x = canvas.width / 2 - width / 2;
  const y = percent(55, canvas.height);

  ctx.drawImage(mouth, x, y, width, height);
};

init();

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

  drawEyeball(-thirteenPercent);
  drawEyeball(thirteenPercent);

  ctx.fill();

  let { x, y } = MousePosition;
  const { left_eye, right_eye } = ASSETS;

  x /= canvas.width;
  y /= canvas.height;

  let open_mount = false;

  if (y < 0.49) {
    open_mount = true;
  }

  if (y === 0) {
    y = 0.5;
  } else if (y < 0.37) {
    y = 0.37;
  } else if (y > 0.75) {
    y = 0.75;
  }

  if (x === 0) {
    x = 0.5;
  } else if (x < 0.23) {
    x = 0.23;
  } else if (x > 0.77) {
    x = 0.77;
  }

  x *= diameter;
  y *= diameter;

  const yOffset = percent(36.5, canvas.height);

  // !TODO: FIX THE POSITION OF LEFT EYE ON THE DIFFERENT SCREENS

  ctx.drawImage(
    left_eye,
    center - leftEyeNegativeOffset + x,
    yOffset + y,
    radius,
    radius
  );
  ctx.drawImage(right_eye, center + x, yOffset + y, radius, radius);

  drawGirl(ctx);

  if (open_mount) {
    drawMouth(ctx);
  }

  // console.log({ x, y });

  requestAnimationFrame(draw);
}
