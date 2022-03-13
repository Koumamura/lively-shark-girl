const production = !process.env.ROLLUP_WATCH;

/** @type {import('rollup').RollupOptions} */
const config = {
  input: "src/main.js",
  watch: !production,
  output: {
    file: "./assets/main.js",
    format: "es",
    sourcemap: !production,
  },
};

export default config;
