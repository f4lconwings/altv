import { WebView, log } from "alt-client";

export let Browser = new WebView("http://resource/interface/index.html");

export function startBrowser() {
  log("Starting WebView");
  Browser = new WebView("http://resource/interface/index.html");
  Browser.focus();
}
