import typescript from "@rollup/plugin-typescript";

export default [
  // CommonJS 빌드
  {
    input: "src/index.ts",
    output: {
      file: "dist/index.js",
      format: "cjs",
      exports: "named",
    },
    plugins: [
      typescript({
        tsconfig: "./tsconfig.json",
        declaration: true,
        declarationDir: "./dist",
        rootDir: "./src",
      }),
    ],
  },
  // ES Module 빌드
  {
    input: "src/index.ts",
    output: {
      file: "dist/index.esm.js",
      format: "es",
    },
    plugins: [
      typescript({
        tsconfig: "./tsconfig.json",
        declaration: false,
      }),
    ],
  },
];
