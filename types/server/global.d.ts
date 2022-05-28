import type { ValidEnv } from "../../src/server/lib/env";

declare global {
  namespace NodeJS {
    const ProcessEnv: ValidEnv;
  }
}

export {};
