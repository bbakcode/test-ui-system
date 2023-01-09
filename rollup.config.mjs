import babel from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import postcss from "rollup-plugin-postcss";
import postcssPrefixer from "postcss-prefixer";
import terser from "@rollup/plugin-terser";
const pkg = require("./package.json");

const extensions = [".js", ".jsx", ".ts", ".tsx", ".mjs"];

const config = [
  {
    external: [/node_modules/],
    input: "./src/index.ts",
    output: [
      {
        dir: "./dist",
        format: "cjs",
        preserveModules: true,
        preserveModulesRoot: "src",
      },
      {
        file: "./dist/index.esm.js",
        format: "esm",
      },
      {
        name: pkg.name,
        file: "./dist/index.umd.js",
        format: "umd",
        globals: {
          react: "React",
          "style-inject": "styleInject",
        },
      },
    ],
    plugins: [
      nodeResolve({ extensions }),
      babel({
        extensions,
        exclude: "node_modules/**",
        include: ["src/**/*"],
        babelHelpers: "bundled",
      }),
      commonjs({ include: "node_modules/**" }),
      peerDepsExternal(),
      typescript({ tsconfig: "./tsconfig.json" }),
      postcss({
        use: ["sass"],
        extract: false,
        modules: true,
        sourceMap: false,
        inject: (cssVariableName) =>
          `import styleInject from 'style-inject';styleInject(${cssVariableName});`,
        plugins: [
          postcssPrefixer({
            prefix: `${pkg.name}__`,
          }),
        ],
      }),
      terser(),
    ],
  },
];

export default config;
