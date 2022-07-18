import * as alt from "alt-server";
import { Notice } from "~/lib/cli";

type StoredClientEvent = Partial<{
  [key in keyof IClientEvent]: StoredEvent<IClientEvent[key]>;
}>;
type StoredServerEvent = Partial<{
  [key in keyof alt.IServerEvent]: StoredEvent<alt.IServerEvent[key]>;
}>;

export const activeEventListeners: StoredClientEvent & StoredServerEvent = {};

export function addClientEventListener<T extends keyof IClientEvent>(
  name: T,
  callback: ClientEventCallback,
) {
  if (!!activeEventListeners[name])
    throw new Notice(`Event listeners for client event "${name}" are called multiple times`);

  activeEventListeners[name] = {
    createdAt: Date.now(),
    callback,
  };

  alt.onClient(name, callback);
}

export function addServerEventListener<T extends keyof alt.IServerEvent>(
  name: T,
  callback: alt.IServerEvent[T],
) {
  if (!!activeEventListeners[name])
    throw new Notice(`Event listeners for server event "${name}" are called multiple times`);

  activeEventListeners[name] = {
    createdAt: Date.now(),
    callback: callback as (...args: any[]) => any,
  };

  alt.on(name, callback);
}

export function removeEventListener<T extends keyof (IClientEvent | alt.IServerEvent)>(name: T) {
  if (!activeEventListeners[name])
    throw new Notice(
      `Event listener for event "${name}" attempted to be removed while it does not exist`,
    );

  delete activeEventListeners[name];
}
