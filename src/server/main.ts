import { colorize, Color, print, trace, alert } from "./lib/cli";
import { connectToDatabase } from "./database";
import { connectDiscordBot } from "./discord";

function main() {
  import("./handler");
}

// Node process safety
process.on("beforeExit", onBeforeExit);
process.on("exit", onExit);
process.on("uncaughtException", onUncaughtException);
process.on("unhandledRejection", onUnhandledRejection);

// Startup
const initDeps = [connectToDatabase, connectDiscordBot];
Promise.all(initDeps).then(onReady).catch(onBootError).then(main);

// Event callbacks below
// ---------------------

function onReady() {
  print(colorize("Database and Discord connection established", Color.green));
  return true;
}

function onBootError(error: Error) {
  alert("Boot process was interrupted by an error");
  trace(error).then(process.exit);
  return;
}

/** Shutdown handler */
function onBeforeExit() {}

function onExit(code: number) {
  print(`Exiting process with code ${colorize(code.toString(), Color.cyan)}`);
}

function onUncaughtException(error: Error) {
  trace(error);
  process.exit(550);
}

function onUnhandledRejection(reason: Error | any, promise: Promise<any>) {
  print(colorize(`Unhandled rejection for promise`, Color.red));
  console.log(promise);
  reason.stack && trace(reason);
}
