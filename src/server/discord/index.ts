import type * as Discord from "discord.js";
import { Client as DiscordClient, Intents } from "discord.js";

import { alert, print } from "~/lib/cli";

const intents = new Intents();
intents.add(
  Intents.FLAGS.GUILD_PRESENCES,
  Intents.FLAGS.GUILD_MEMBERS,
  Intents.FLAGS.DIRECT_MESSAGES,
);

const Bot = new DiscordClient({ intents });
const Cache = {
  guild: undefined as undefined | Discord.Guild,
  wRole: undefined as undefined | Discord.Role,
};
const Config = {
  serverId: process.env.SERVER_ID,
  botTokenSecret: process.env.BOT_SECRET,
  roleWhitelistId: process.env.ROLE_WHITELIST_ID,
};

Bot.on("error", onError);
Bot.on("rateLimit", onRateLimit);
Bot.on("guildMemberUpdate", onMemberUpdate);

export const connectDiscordBot = () =>
  new Promise((resolve, reject) => {
    if (!isWhitelistOn()) return resolve(false);

    if (!isSet(Config.botTokenSecret)) {
      alert("Bot ID is not set in configuration");
      return reject();
    }

    Bot.login(Config.botTokenSecret);

    Bot.on("ready", () => {
      if (!isSet(Config.serverId) || !isSet(Config.roleWhitelistId)) {
        alert("Configuration is missing");
        return reject();
      }

      Cache.guild = Bot.guilds.cache.get(Config.serverId);
      Cache.wRole = Cache.guild?.roles.cache.get(Config.roleWhitelistId);

      if (Cache.guild && Cache.wRole) {
        print("Discord Bot connected successfully");
        return resolve(true);
      }

      Cache.guild || alert("Guild could not be found");
      Cache.wRole || alert("Whitelist role could not be found");

      reject();
    });
  });

function onError() {}
function onRateLimit() {}
function onMemberUpdate() {}

export function isWhitelistOn() {
  return !(process.env.ENABLE_WHITELIST === "false");
}

function isSet(parameter: string | undefined): parameter is string {
  return typeof parameter === "string";
}
