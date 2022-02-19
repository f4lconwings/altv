import * as alt from "alt-server";
import * as sjcl from "sjcl";

const ip = encodeURI(`http://${process.env["REDIRECT_IP"]}:7790/authenticate`);
const authURI = `https://discord.com/api/oauth2/authorize?client_id=${process.env["CLIENT_ID"]}&redirect_uri=${ip}&prompt=none&response_type=code&scope=identify`;

alt.on("discord:req:auth", handleAuth);

function handleAuth(player: alt.Player) {
  // const semiRandomNumber = Math.floor(Math.random() * 6e4);

  const hashBytes = sjcl.hash.sha256.hash(player.ip);
  console.log(player.ip, authURI, hashBytes);
}
