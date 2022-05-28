import { ASSETS } from "./assets.js";
import { devicePixelRatio } from './constants.js';

/**
 * @param {number} x
 * @param {number} y
 */
export const percent = (x, y) => {
  return (x / 100) * y;
};

/**
 * @param {() => void} callback
 */
export const createMousePositionListener = (callback) => {
  const MousePosition = {
    x: 0,
    y: 0,
  };

  /**
   * @param {MouseEvent} event
   */
  const updateMousePosition = (event) => {
    MousePosition.x = event.pageX * devicePixelRatio;
    MousePosition.y = event.pageY * devicePixelRatio;

    callback();
  };

  document.addEventListener("mousemove", updateMousePosition);
  document.addEventListener("mouseenter", updateMousePosition, false);

  return { MousePosition };
};

/**
 * @param {() => void} callback
 */
export const createWindowSizeListener = (callback) => {
  const WindowSize = {
    width: window.innerWidth * devicePixelRatio,
    height: window.innerHeight * devicePixelRatio,
  };

  const onSizeChanges = () => {
    WindowSize.width = window.innerWidth * devicePixelRatio;
    WindowSize.height = window.innerHeight * devicePixelRatio;

    callback();
  };

  window.addEventListener("load", onSizeChanges);
  window.addEventListener("resize", onSizeChanges);

  return { WindowSize };
};

/**
 * Draws girl
 * @param {HTMLCanvasElement} canvas
 * @param {CanvasRenderingContext2D} ctx
 */
export const drawGirl = (canvas, ctx) => {
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
 * @param {HTMLCanvasElement} canvas
 * @param {CanvasRenderingContext2D} ctx
 */
export const drawMouth = (canvas, ctx) => {
  const { mouth } = ASSETS;

  const width = percent(9, canvas.height);
  const scale = width / mouth.width;

  const height = mouth.height * scale;

  const x = canvas.width / 2 - width / 2;
  const y = percent(55, canvas.height);

  ctx.drawImage(mouth, x, y, width, height);
};

export const { floor } = Math;
