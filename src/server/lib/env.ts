import * as dotenv from "dotenv";
import * as fs from "fs";
import { alert, print, colorize, Color } from "./cli";

dotenv.config();

const ValidEnvKeys = [
  "BOT_SECRET",
  "CLIENT_ID",
  "CLIENT_SECRET",
  "REDIRECT_IP",
  "SERVER_ID",
  "ROLE_WHITELIST_ID",
  "ENABLE_WHITELIST",
  "ENABLE_VERBOSE",
] as const;

export type ValidEnv = { [key in typeof ValidEnvKeys[number]]: string };

export function checkEnv() {
  return new Promise((resolve) => {
    if (!fs.existsSync(".env")) {
      generateEnv();
      alert("Missing .env in base server directory. File has been created");
      process.exit(601); // Error 601
    }

    if (!isValidEnv(process.env)) {
      alert("Some .env variables do not have a value");
      process.exit(602); // Error 602
    }

    resolve(true);
  });
}

function generateEnv() {
  for (const envKey of ValidEnvKeys) {
    fs.appendFileSync(".env", `\n${envKey}=`);
  }
}

function isValidEnv(env: NodeJS.ProcessEnv): env is ValidEnv {
  for (const envKey of ValidEnvKeys) {
    if (!process.env[envKey] || process.env) {
      print(colorize(`${envKey} does not have a (valid string) value in the .env`, Color.yellow));
      return false;
    }
  }
  return true;
}
