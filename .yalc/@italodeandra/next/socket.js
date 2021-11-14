"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupSocketServer = void 0;
var socket_io_1 = require("socket.io");
var socket_io_client_1 = __importDefault(require("socket.io-client"));
var isServer = typeof window === "undefined";
// noinspection JSUnusedGlobalSymbols
function setupSocketServer(server) {
    global.io = new socket_io_1.Server(server);
}
exports.setupSocketServer = setupSocketServer;
var cachedSocked;
var socket = new Proxy({}, {
    get: function (target, prop) {
        return function () {
            var _a;
            var props = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                props[_i] = arguments[_i];
            }
            cachedSocked = cachedSocked || (isServer ? global.io : (0, socket_io_client_1.default)());
            return (_a = cachedSocked)[prop].apply(_a, props);
        };
    },
});
exports.default = socket;
