import * as alt from "alt-server";
import * as sjcl from "sjcl";

import { verbose } from "~/lib/cli";
import { environment } from "~/lib/env";

const redirectURI = encodeURI(environment.REDIRECT_URI);
const authURI = `https://discord.com/api/oauth2/authorize?client_id=${process.env.CLIENT_ID}&redirect_uri=${redirectURI}&prompt=none&response_type=code&scope=identify`;

alt.onClient("discord:req:auth", handleAuth);

verbose("Discord auth started");

function handleAuth(player: alt.Player) {
  verbose(`Auth for player ${player.name}`);
  const semiRandomNumber = Math.floor(Math.random() * 6e4);
  const hashBytes = sjcl.hash.sha256.hash(ipAdressToAnonString(player.ip) + semiRandomNumber);
  const token = sjcl.codec.hex.fromBits(hashBytes);

  alt.emitClient(player, "discord:res:auth", `${authURI}&state=${token}`);
}

function ipAdressToAnonString(ip: alt.Player["ip"]) {
  return ip.split(/\.|:/g).reduce(reduceIP);
}

function reduceIP(sum: string, octet: string) {
  const octInt = parseInt(octet, octet.match(/[a-f]/) ? 16 : 10) || 0;
  if (isNaN(octInt)) throw new Error(`IP octet ${octet} could not be converted into integer`);
  return sum + octInt;
}
