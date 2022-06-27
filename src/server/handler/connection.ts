import * as alt from "alt-server";
import type { Player } from "alt-server";
import { verbose } from "../lib/cli";

alt.on("playerConnect", onPlayerConnect);
alt.on("playerDisconnect", onPlayerDisconnect);

verbose("Connection handler started");

function onPlayerConnect(player: Player) {
  if (!player.valid) return;

  player.model = "mp_m_freemode_01";
  player.dimension = 0;
  player.spawn(729, -553, 27, 0);
}

function onPlayerDisconnect(player: Player) {
  player;
}
