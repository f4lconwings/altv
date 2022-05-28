import * as alt from "alt-client";
import { setGameControls } from "../lib/controls";
import { Browser, startBrowser } from "../lib/webview";

const Workflow = [
  { method: disableGameControls, text: { top: "Disabling game controls" } },
  { method: setLoaderPage, text: { top: "Initializing user interface" } },
  { method: getUserPreferences, text: { top: "Loading user preferences" } },
  { method: getServerReadiness, text: { top: "Waiting for server response" } },
];

export async function initLoader() {
  for (const [index, step] of Workflow.entries()) {
    displayState({
      progress: (index + 1 / Workflow.length) * 100,
      text: step.text,
    });

    alt.log(step.text.top);

    await step.method();
  }
}

function displayState(state: any) {
  Browser.emit("loader:payload", state);
}

async function disableGameControls() {
  setGameControls(false);

  return true;
}

function setLoaderPage(): Promise<boolean> {
  startBrowser();
  return new Promise((resolve) => {
    function handleResponse() {
      Browser.off("app:res:loader", handleResponse);
      resolve(true);
    }
    Browser.on("app:res:loader", handleResponse);

    Browser.emit("app:req:loader");
  });
}

async function getUserPreferences() {
  return true;
}

function getServerReadiness() {
  return new Promise((resolve) => {
    function response() {
      alt.offServer("cli:res:readiness", response);
      alt.clearInterval(interval);
      resolve(true);
    }
    function emit() {
      alt.emitServer("cli:req:readiness");
    }

    alt.onServer("cli:res:readiness", response);
    const interval = alt.setInterval(emit, 5e3);
    emit();
  });
}
