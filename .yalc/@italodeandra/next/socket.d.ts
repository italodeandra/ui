/// <reference types="node" />
import { Server } from "http";
import { Server as SocketServer } from "socket.io";
import { Socket } from "socket.io-client";
declare global {
    var io: SocketServer;
}
export declare function setupSocketServer(server: Server): void;
declare const socket: SocketServer<import("socket.io/dist/typed-events").DefaultEventsMap, import("socket.io/dist/typed-events").DefaultEventsMap, import("socket.io/dist/typed-events").DefaultEventsMap> | Socket<import("@socket.io/component-emitter").DefaultEventsMap, import("@socket.io/component-emitter").DefaultEventsMap>;
export default socket;
