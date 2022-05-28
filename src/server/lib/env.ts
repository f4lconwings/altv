import * as dotenv from "dotenv";
import * as fs from "fs";
import { alert, print, colorize, Color } from "./cli";

dotenv.config();

const envFileVariables = [
  "BOT_SECRET",
  "CLIENT_ID",
  "CLIENT_SECRET",
  "REDIRECT_IP",
  "SERVER_ID",
  "ROLE_WHITELIST_ID",
  "ENABLE_WHITELIST",
  "ENABLE_VERBOSE",
];

export function checkEnv() {
  return new Promise((resolve) => {
    if (!fs.existsSync(".env")) {
      generateEnv();
      alert("Missing .env in base server directory. File has been created");
      process.exit(601); // Error 601
    }

    if (!isEnvValid) {
      alert("Some .env variables do not have a value");
      process.exit(602); // Error 602
    }

    resolve(true);
  });
}

function generateEnv() {
  for (const envVariable of envFileVariables) {
    fs.appendFileSync(".env", `\n${envVariable}=`);
  }
}

function isEnvValid() {
  let faultyVariables = 0;
  for (const envVariable of envFileVariables) {
    if (!process.env[envVariable]) {
      print(colorize(`${envVariable} does not have a value in the .env`, Color.yellow));
      faultyVariables++;
    }
  }
  return faultyVariables === 0;
}
