const createImage = () => document.createElement("img");

const assetsDir = "/assets/images/";
const fileExtension = ".webp";

const ASSETS = {
  girl: createImage(),
  left_eye: createImage(),
  right_eye: createImage(),
  mouth: createImage(),
};

const loaded = new Promise((resolve) => {
  let keys = Object.keys(ASSETS);
  let length = keys.length;
  let current = 0;

  for (const key of keys) {
    /** @type {HTMLImageElement} */
    const img = ASSETS[key];

    img.src = `${assetsDir}${key.replaceAll("_", "-")}${fileExtension}`;

    img.onload = () => {
      current += 1;
      if (current === length) {
        resolve(true);
      }
    };
  }
});

export { ASSETS, loaded };
