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

let mouthtrigger = 45;
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
  if (name === "MouthTrigger") {
    const float = parseFloat(value);
    mouthtrigger = isNaN(float) || !isFinite(float) ? 0 : float;
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

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;  // 

    const ninePercent = percent(9, canvas.height);

    const radius = floor(ninePercent * 0.7);
    const diameter = radius * 2;

    /**
     * @param {number} x
     */
    const drawEyeball = (x) => {
      ctx.arc(
        floor(centerX + x),
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

    if (y * 100 < mouthtrigger) {
      open_mouth = true;
    }


    const xpositiveLimit = (xright / 100) * canvas.width; 
    const xnegativeLimit = (xleft / 100) * canvas.width; 

    // Horizontal limit for eye movement and return smooth to center
    eye_follow(xnegativeLimit,xpositiveLimit,x,y,smoothFactor);

    const yOffset = percent(36.5, canvas.height);
    
    // this is a magical number
    const eighteenAnd675 = percent(18.675, canvas.height);

    // Draw smooth
    ctx.drawImage(
      left_eye,
      centerX - eighteenAnd675 + eyeX * diameter,
      yOffset + eyeY * diameter,
      radius,
      radius
    );

    ctx.drawImage(right_eye, centerX + eyeX * diameter, yOffset + eyeY * diameter, radius, radius);

    drawGirl(canvas, ctx);

    if (open_mouth) {
      drawMouth(canvas, ctx);
    }
  };

  /** eye follow mouse 
   * @param {number} limitLeft      - limit to go left 
   * @param {number} limitRight     - limit to go right
   * @param {number} mouseX         - position of the mouse on the x-axis
   * @param {number} mouseY         - position of the mouse on the x-axis
   * @param {number} smoothFactor   - smoothing factor
   */
  function eye_follow(limitLeft, limitRight,mouseX, mouseY, smoothFactor) {
    // If the mouse is out of bounds, move the eyes back to center smoothly
    if (mouseX * canvas.width > limitRight || mouseX * canvas.width < limitLeft) {
    eyeX += (0.5 - eyeX) * smoothFactor;
    eyeY += (0.5 - eyeY) * smoothFactor;
    } else if (mouseY * canvas.height <= 0) {
    // When mouse is too high, move eyes back to center smoothly
    eyeX += (0.5 - eyeX) * smoothFactor;
    eyeY += (0.6 - eyeY) * smoothFactor;
    } else {
      // Map the mouse X position to the eye movement range
        const mappedEyeX = mapRange(
          mouseX * canvas.width,
          limitLeft, // minimum mouse position
          limitRight, // maximum mouse position
          0.25, // minimum for eyeX
          0.75 // maximum for eyeX
        );
      
      // Map the mouse Y position to the eye movement range
      const mappedEyeY = mapRange(
        mouseY * canvas.height,
        0, // top of the screen
        canvas.height, // bottom of the screen
        0.35, // minimum for eyeY
        0.75 // maximum for eyeY
      );
      
       // Smoothly move the eyes to follow the mouse within the boundaries
        eyeX += (mappedEyeX - eyeX) * smoothFactor;
        eyeY += (mappedEyeY - eyeY) * smoothFactor;
      }
    }
   /**
 * Maps a value from one range to another.
 * @param {number} value - The value to be mapped.
 * @param {number} inMin - The minimum of the input range.
 * @param {number} inMax - The maximum of the input range.
 * @param {number} outMin - The minimum of the output range.
 * @param {number} outMax - The maximum of the output range.
 * @returns {number} - The mapped value in the new range.
 */
    function mapRange(value, inMin, inMax, outMin, outMax) {
      return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
  }
}

