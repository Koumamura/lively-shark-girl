particlesJS("particles-js", {
    particles: {
      number: { value: 83, density: { enable: false, value_area: 800 } },
      color: { value: "#8ef8ff" },
      shape: {
        type: "image",
        stroke: { width: 2, color: "#52d6ff" },
        polygon: { nb_sides: 5 },
        image: {
          src: "./assets/images/bolha.webp",
          width: 80,
          height: 80
        }
      },
      opacity: {
        value: 0.48102361825965684,
        random: true,
        anim: {
          enable: true,
          speed: 0.5,
          opacity_min: 0,
          sync: true
        }
      },
      size: {
        value: 35,
        random: true,
        anim: { enable: false, speed: 40, size_min: 0.1, sync: false }
      },
      line_linked: {
        enable: false,
        distance: 80.17060304327615,
        color: "#ffffff",
        opacity: 0.4,
        width: 2
      },
      move: {
        enable: true,
        speed: 6,
        direction: "top",
        random: true,
        straight: false,
        out_mode: "out",
        bounce: true,
        attract: { enable: false, rotateX: 600, rotateY: 1200 }
      }
    },
    interactivity: {
      detect_on: "window",
      events: {
        onhover: { enable: true, mode: "repulse" },
        onclick: { enable: true, mode: "repulse" },
        resize: true
      },
      modes: {
        grab: { distance: 400, line_linked: { opacity: 0.5 } },
        bubble: { distance: 400, size: 4, duration: 0.3, opacity: 1, speed: 3 },
        repulse: { distance: 120, duration: 15 },
        push: { particles_nb: 4 },
        remove: { particles_nb: 2 }
      }
    },
    retina_detect: false
  });
  var count_particles, stats, update;
  stats = new Stats();
  stats.setMode(0);
  stats.domElement.style.position = "absolute";
  stats.domElement.style.left = "0px";
  stats.domElement.style.top = "0px";
  document.body.appendChild(stats.domElement);
  count_particles = document.querySelector(".js-count-particles");
  update = function () {
    stats.begin();
    stats.end();
    if (window.pJSDom[0].pJS.particles && window.pJSDom[0].pJS.particles.array) {
      count_particles.innerText = window.pJSDom[0].pJS.particles.array.length;
    }
    requestAnimationFrame(update);
  };
  requestAnimationFrame(update);
  