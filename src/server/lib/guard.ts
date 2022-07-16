import { Color, colorize, print, trace } from "./cli";

export function guardNodeProcess() {
  process.on("beforeExit", handleShutdown);
  process.on("exit", handleExit);
  process.on("uncaughtException", handleUncaughtException);
  process.on("unhandledRejection", handleUnhandledRejection);

  print(colorize("guardNodeProcess event listeners are running", Color.cyan));
}

const handleShutdown: NodeJS.BeforeExitListener = (code) => {
  // ToDo
  print(`Shutdown! ${code}`);
};

const handleExit: NodeJS.ExitListener = (code) => {
  print(`Exiting process with code ${colorize(code.toString(), Color.cyan)}`);
};

const handleUncaughtException: NodeJS.UncaughtExceptionListener = (error, origin) => {
  print(colorize(`Uncaught Exception originating from ${origin}`, Color.red));
  trace(error);

  process.exit(550);
};

const handleUnhandledRejection: NodeJS.UnhandledRejectionListener = (reason, promise) => {
  print(colorize(`Unhandled rejection for promise`, Color.red));
  console.log(promise);
  print(colorize(`Reason: ${reason ?? "undefined"}`, Color.red));
};
