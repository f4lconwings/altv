import { Client as DiscordClient, Intents } from "discord.js";
import type * as Discord from "discord.js";

import { dcToken, dcGuild, dcWRole } from "../config";
import { print, alert } from "../lib/cli";

const BotIntents = new Intents();
BotIntents.add(
  Intents.FLAGS.GUILD_PRESENCES,
  Intents.FLAGS.GUILD_MEMBERS,
  Intents.FLAGS.DIRECT_MESSAGES,
);

const Bot = new DiscordClient();
const Cache = {
  guild: undefined as undefined | Discord.Guild,
  wRole: undefined as undefined | Discord.Role,
};

Bot.on("error", onError);
Bot.on("rateLimit", onRateLimit);
Bot.on("guildMemberUpdate", onMemberUpdate);

Bot.login(dcToken);

export const connectDiscordBot = new Promise((resolve, reject) => {
  Bot.on("ready", () => {
    Cache.guild = Bot.guilds.cache.get(dcGuild);
    Cache.wRole = Cache.guild?.roles.cache.get(dcWRole);

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
