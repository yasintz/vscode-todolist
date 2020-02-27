import svelte from "rollup-plugin-svelte";
import CleanCSS from "clean-css";
import fs from "fs";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import { terser } from "rollup-plugin-terser";
import autoPreprocess from "svelte-preprocess";

const PATHS = {
  UI_INDEX_FILE: "resources/ui/index.html",
  BUNDLE_JS: "ui/template/build/bundle.js",
  MAIN_JS: "ui/main.js",
  HTML_TEMPLATE: "ui/template/index.html",
  GLOBAL_CSS: "ui/global.css"
};

const HTML_TEMPLATE = fs.readFileSync(PATHS.HTML_TEMPLATE, "utf-8");
const GLOBAL_CSS = fs.readFileSync(PATHS.GLOBAL_CSS, "utf-8");
const store = createStore();

export default {
  input: PATHS.MAIN_JS,
  output: {
    sourcemap: false,
    format: "iife",
    name: "app",
    file: PATHS.BUNDLE_JS
  },
  plugins: [
    svelte({
      css: store.updateCss,
      preprocess: autoPreprocess()
    }),
    resolve({
      browser: true,
      dedupe: ["svelte"]
    }),
    commonjs(),
    store.onBuildEnd(),
    // If we're building for production (npm run build
    // instead of npm run dev), minify
    terser()
  ],
  watch: {
    clearScreen: false
  }
};

function createStore() {
  const _store = {
    htmlTemplate: "",
    html: "",
    css: ""
  };

  function updateCss({ code: css }) {
    _store.css = css;
  }

  function getHtml() {
    var { styles } = new CleanCSS().minify(`${store.css}\n${GLOBAL_CSS}`);
    const bundleJs = fs.readFileSync(PATHS.BUNDLE_JS, "utf-8");
    return HTML_TEMPLATE.replace(
      "<!---js--->",
      `<script>${bundleJs}</script>`
    ).replace("<!---css--->", `<style>${styles}</style>`);
  }

  function onBuildEnd() {
    return {
      writeBundle() {
        fs.writeFileSync(PATHS.UI_INDEX_FILE, getHtml());
      }
    };
  }

  return Object.assign(_store, {
    updateCss,
    getHtml,
    onBuildEnd
  });
}
