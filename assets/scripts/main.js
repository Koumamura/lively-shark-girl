const leftEye = document.getElementById("left-eye");
const rightEye = document.getElementById("right-eye");

let width = window.innerWidth;
let height = window.innerHeight;

window.addEventListener("resize", () => {
  width = window.innerWidth;
  height = window.innerHeight;
});

document.addEventListener(
  "mousemove",
  (event) => {
    let x = event.x - width / 2 + 15;
    let y = event.y - height / 2 + 20;

    const computeLeftEye = () => {
      let tx = (() => {
        if (x > 10) return 10;
        if (x < -20) return -20;
        return x;
      })();

      let ty = (() => {
        if (y > 10) return 10;
        if (y < -20) return -20;
        return y;
      })();

      leftEye.style.transform = `translate(${tx}px, ${ty}px)`;
    };

    const computeRightEye = () => {
      let tx = (() => {
        if (x > 20) return 20;
        if (x < -20) return -20;
        return x;
      })();

      let ty = (() => {
        if (y > 10) return 10;
        if (y < -20) return -20;
        return y;
      })();

      rightEye.style.transform = `translate(${tx}px, ${ty}px)`;
    };

    computeLeftEye();
    computeRightEye();
  },
  { passive: true }
);
