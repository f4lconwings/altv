import * as fs from "fs";
import * as path from "path";
import { environment } from "./env";

import { getDate, getTime } from "./time";

export enum Color {
  red = "\x1b[31m",
  green = "\x1b[32m",
  yellow = "\x1b[33m",
  blue = "\x1b[34m",
  magenta = "\x1b[35m",
  cyan = "\x1b[36m",
  white = "\x1b[37m",
}

/** Colorizes the input message with the given color enum */
export function colorize(message: string, color: Color) {
  return `${color}${message}${Color.white}`;
}

/** Logs to `stdout` with a current timestamp */
export function print(message: string) {
  console.log(`[${getTime()}] ${message}`);
}

/** Logs to `stdout` if verbose mode is set in .env */
export function verbose(message: string) {
  if (!environment.ENABLE_VERBOSE) return;
  print(`[${colorize("V", Color.cyan)}] ${message}`);
}

/** Logs to `stdout` in red color */
export function alert(message: string) {
  print(colorize(message, Color.red));
}

export class Notice extends Error {
  constructor(message: string) {
    super(message);
    alert(message);
  }
}

/** Logs an error onto a logging file */
export async function trace(error: Error = new Error()) {
  await fs.promises
    .appendFile(
      path.join(__dirname, "../../../../error.log"),
      `${getDate()} ${error.stack || error}\n`,
    )
    .then(() => {
      print(colorize("Uncaught exception has been traced into error.log", Color.red));
    });
  return 600;
}
