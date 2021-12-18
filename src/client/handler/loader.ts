import * as alt from "alt-client";

import { Browser, Controls } from "../lib";

const readyState = {
  srv: false,
  app: false,
};

Controls.setGameControls(false);

// App readiness handling
Browser.on("app:loader:e:ready", onAppReady);
function onAppReady() {
  Browser.off("app:loader:e:ready", onAppReady);

  readyState.app = true;
}

// Request handling
Browser.on("app:loader:q:serverReadiness", onGetServerReadiness);
function onGetServerReadiness() {
  Browser.off("app:loader:q:serverReadiness", onGetServerReadiness);

  let interval = alt.setInterval(() => {
    if (readyState.srv) return alt.clearInterval(interval);
    alt.emitServer("srv:loader:q:serverReadiness");
  }, 5e3);
}

// Response handling
alt.onServer("srv:loader:r:serverReadiness", onSetServerReadiness);
function onSetServerReadiness() {
  alt.offServer("srv:loader:r:serverReadiness", onSetServerReadiness);

  readyState.srv = true;
  Browser.emit("app:loader:r:serverReadiness");
}
