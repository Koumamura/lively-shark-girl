const createImage = () => document.createElement("img");

const assetsDir = "/assets/images/";
const fileExtension = ".png";

const ASSETS = {
  girl: createImage(),
  left_eye: createImage(),
  right_eye: createImage(),
  mouth: createImage(),
};

ASSETS.girl.src = `${assetsDir}girl${fileExtension}`;
ASSETS.left_eye.src = `${assetsDir}left-eye${fileExtension}`;
ASSETS.right_eye.src = `${assetsDir}right-eye${fileExtension}`;
ASSETS.mouth.src = `${assetsDir}mouth${fileExtension}`;

const loaded = new Promise((resolve) => {
  let keys = Object.keys(ASSETS);
  let length = keys.length;
  let current = 0;

  for (const key of keys) {
    /** @type {HTMLImageElement} */
    const img = ASSETS[key];

    img.onload = () => {
      current += 1;
      if (current === length) {
        resolve(true);
      }
    };
  }
});

export { ASSETS, loaded };
