import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import babel from "@rollup/plugin-babel";
import typescript from "@rollup/plugin-typescript";
import postcss from "rollup-plugin-postcss";
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
        file: "./dist/index.es.js",
        format: "es",
      },
      {
        file: "./dist/index.umd.js",
        format: "umd",
        name: pkg.name,
        globals: {
          react: "React",
          "style-inject": "styleInject",
        },
      },
    ],
    plugins: [
      nodeResolve({ extensions }),
      commonjs({ include: "node_modules/**" }),
      peerDepsExternal(),
      babel({
        exclude: "node_modules/**",
        extensions,
        include: ["src/**/*"],
        babelHelpers: "bundled",
      }),
      typescript(),
      postcss({
        extract: false,
        modules: true,
        sourceMap: false,
        inject: (cssVariableName) =>
          `import styleInject from 'style-inject';styleInject(${cssVariableName});`,
        use: ["sass"],
      }),
      terser(),
    ],
  },
];

export default config;
