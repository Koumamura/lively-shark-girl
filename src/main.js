import {
  percent,
  createMousePositionListener,
  createWindowSizeListener,
  drawGirl,
  drawMouth,
  floor,
} from "./utils.js";

import { ASSETS, loaded as assetsLoaded } from "./assets.js";

import { PI } from "./constants.js";

/** @type {HTMLCanvasElement} */
const canvas = document.getElementById("canvas");

let ahegaoTrigger = 39;
let xright = 90; //maximum limit of the mouse position on the right side of the screen, in percentage
let xleft = 10;//maximum limit of the mouse position on the right side of the screen, in percentage
let eyeX = 0.5;  // starting position  X-axis
let eyeY = 0.5;  // starting position Y-axis

const smoothFactor = 0.1;  // Fator de suavização para o movimento dos olhos

/**
 * https://github.com/rocksdanister/lively/wiki/Web-Guide-IV-:-Interaction#lively-properties
 * @param {string} name
 * @param {string | number} value
 */
const livelyPropertyListener = (name, value) => {
  if (name === "ahegaoTrigger") {
    const float = parseFloat(value);
    ahegaoTrigger = isNaN(float) || !isFinite(float) ? 0 : float;
  }
  if (name === "RangeXPositiveLook") {
    const float = parseFloat(value);
    xright= isNaN(float) || !isFinite(float) ? 0 : float;
  }
  if (name === "RangeXNegativeLook") {
    const float = parseFloat(value);
    xleft= isNaN(float) || !isFinite(float) ? 0 : float;
  }
  
};

window.livelyPropertyListener = livelyPropertyListener;

/**
 * Wait till all assets are loaded
 */
assetsLoaded.then(main);

function main() {
  const { MousePosition } = createMousePositionListener(() => {
    requestAnimationFrame(draw);
  });

  const { WindowSize } = createWindowSizeListener(() => {
    canvas.width = WindowSize.width;
    canvas.height = WindowSize.height;

    requestAnimationFrame(draw);
  });

  const ctx = canvas.getContext("2d");

  const draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

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

    const ninePercent = percent(9, canvas.height);

    const radius = floor(ninePercent * 0.7);
    const diameter = radius * 2;

    /**
     * @param {number} x
     */
    const drawEyeball = (x) => {
      ctx.arc(
        floor(center + x),
        floor(canvas.height / 2 - ninePercent / 2),
        radius,
        0,
        2 * PI
      );
    };

    drawEyeball(-ninePercent);
    drawEyeball(ninePercent);

    ctx.fill();

    let { x, y } = MousePosition;
    const { left_eye, right_eye } = ASSETS;

    x /= canvas.width;
    y /= canvas.height;

    let open_mouth = false;

    if (y * 100 < ahegaoTrigger) {
      open_mouth = true;
    }
    const xpositiveLimit = (xright / 100) * canvas.width; 
    const xnegativeLimit = (xleft / 100) * canvas.width; 

   
    // Horizontal limit for eye movement and return smooth to center
    if (x * canvas.width > xpositiveLimit || x * canvas.width < xnegativeLimit) {
      // If the mouse is out of bounds, move the eyes back to center smooth
      eyeX += (0.5 - eyeX) * smoothFactor;
      eyeY += (0.5 - eyeY) * smoothFactor;
      
    } else if (y * canvas.height <= 0 ) {
      
      eyeX += (0.5 - eyeX) * smoothFactor;
      eyeY += (0.6 - eyeY) * smoothFactor;
      
    } else {
      
      // Otherwise, the eyes follow the mouse smoothly
      eyeX += (x - eyeX) * smoothFactor;
      eyeY += (y - eyeY) * smoothFactor;
    }
    
    if (eyeY < 0.37) {
      eyeY = 0.37;
    } else if (eyeY > 0.75) {
      eyeY = 0.75;
    }

    if (eyeX < 0.23) {
      eyeX = 0.23;
    } else if (eyeX > 0.77) {
      eyeX = 0.77;
    }

    const yOffset = percent(36.5, canvas.height);
    
    // this is a magical number
    const eighteenAnd675 = percent(18.675, canvas.height);

    // Draw smooth
    ctx.drawImage(
      left_eye,
      center - eighteenAnd675 + eyeX * diameter,
      yOffset + eyeY * diameter,
      radius,
      radius
    );

    ctx.drawImage(right_eye, center + eyeX * diameter, yOffset + eyeY * diameter, radius, radius);

    drawGirl(canvas, ctx);

    if (open_mouth) {
      drawMouth(canvas, ctx);
    }
  };
}
