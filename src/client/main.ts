import * as alt from "alt-client";
import { requestModel } from "natives";

import "./handler";

alt.on("connectionComplete", onConnectionComplete);
alt.on("resourceStop", onResourceStop);

function onConnectionComplete() {
  requestModel(alt.hash("mp_f_freemode_01"));
  requestModel(alt.hash("mp_m_freemode_01"));
}

function onResourceStop() {}
