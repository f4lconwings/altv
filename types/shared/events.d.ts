/// <reference types="@altv/types-server"/>

declare type ServerPlayer = import("alt-server").Player;

declare interface IClientEvent {
  ServerEvent: (player: ServerPlayer, ...args: any[]) => void;
}
declare type ClientEventCallback = (player: ServerPlayer, ...args: any[]) => void;

declare type StoredEvent<CallbackType extends Function> = {
  createdAt: number;
  callback: CallbackType;
};
