import * as dotenv from "dotenv";
import * as env from "env-var";

dotenv.config();

export const environment = {
  DATABASE: env.get("DATABASE").required().asString(),
  DISCORD: env.get("DISCORD").required().asJson(),
  REDIRECT_URI: env.get("REDIRECT_IP").required().asString(),
  ENABLE_WHITELIST: env.get("ENABLE_WHITELIST").required().asBool(),
  ENABLE_VERBOSE: env.get("ENABLE_VERBOSE").required().asBool(),
};
