"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getIp(req) {
    var _a;
    var ip = req.headers["x-real-ip"];
    var forwardedFor = req.headers["x-forwarded-for"];
    if (!ip && forwardedFor) {
        ip = (_a = forwardedFor === null || forwardedFor === void 0 ? void 0 : forwardedFor.split(",").at(0)) !== null && _a !== void 0 ? _a : "Unknown";
    }
    if (!ip && req.socket.remoteAddress) {
        ip = req.socket.remoteAddress;
    }
    return ip;
}
exports.default = getIp;
