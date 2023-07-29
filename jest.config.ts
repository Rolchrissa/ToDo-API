import { JestConfigWithTsJest, pathsToModuleNameMapper } from "ts-jest";
const { compilerOptions } = require("./tsconfig");
const jestConfig: JestConfigWithTsJest = {
  // [...]
  moduleNameMapper: {
    "^src/(.*)$": "<rootDir>/src/$1",
  },
  transform: {
    // '^.+\\.[tj]sx?$' to process js/ts with `ts-jest`
    // '^.+\\.m?[tj]sx?$' to process js/ts/mjs/mts with `ts-jest`
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        tsconfig: "./tsconfig.json",
      },
    ],
  },
};

export default jestConfig;
