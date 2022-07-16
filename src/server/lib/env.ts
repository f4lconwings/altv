import * as dotenv from "dotenv";
import * as env from "env-var";

dotenv.config();

export const environment = {
  DATABASE: env.get("DATABASE").asString(),
  DISCORD: env.get("DISCORD").asJson(),
  REDIRECT_IP: env.get("REDIRECT_IP").asString(),
  ENABLE_WHITELIST: env.get("ENABLE_WHITELIST").asBool(),
  ENABLE_VERBOSE: env.get("ENABLE_VERBOSE").asBool(),
};
