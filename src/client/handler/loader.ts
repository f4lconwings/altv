/* import * as alt from "alt-client";

import { Browser, Controls } from "../lib";

type DisplayText = { top: string; bottom?: string };
type LoaderState = {
  progress: number;
  text: DisplayText;
};

const Workflow = [disableGameControls, setLoaderPage; getUserPreferences, getServerReadiness];

export default function Init() {
  return Promise.all(Workflow);
}

function displayState(state: LoaderState) {
  Browser.emit;
}

async function disableGameControls() {
  Controls.setGameControls(false);

  return true;
}

function setLoaderPage() {
  Browser.emit("app:req:loader");
  return new Promise((resolve, reject) => {
    Browser.on("app:res:loader", handleResponse);

    function handleResponse(err?: Error) {
      if (err) return reject(err);

      Browser.off("app:res:loader", handleResponse);

      return resolve(true);
    }
  });
}

function getUserPreferences() {}

// App readiness handling
Browser.on("app:loader:e:ready", onAppReady);
function onAppReady() {
  Browser.off("app:loader:e:ready", onAppReady);
}

// Request handling
Browser.on("app:loader:q:serverReadiness", onGetServerReadiness);
function onGetServerReadiness() {
  Browser.off("app:loader:q:serverReadiness", onGetServerReadiness);

  let interval = alt.setInterval(() => {
    if (true) return alt.clearInterval(interval);
    alt.emitServer("srv:loader:q:serverReadiness");
  }, 5e3);
}

// Response handling
alt.onServer("srv:loader:r:serverReadiness", onSetServerReadiness);
function onSetServerReadiness() {
  alt.offServer("srv:loader:r:serverReadiness", onSetServerReadiness);

  Browser.emit("app:loader:r:serverReadiness");
}
 */
