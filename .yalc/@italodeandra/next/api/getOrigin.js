"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getOrigin(req) {
    var _a;
    var origin;
    if (req.headers["referer"]) {
        origin = (_a = req.headers["referer"]) === null || _a === void 0 ? void 0 : _a.split("/").slice(0, 3).join("/");
    }
    else if (req.headers["x-forwarded-host"]) {
        origin = "".concat(req.headers["x-forwarded-proto"], "://").concat(req.headers["x-forwarded-host"]);
    }
    else if (req.headers.origin) {
        origin = req.headers.origin;
    }
    else {
        var host = req.headers.host || "";
        var protocol = /^((localhost)|(\d+\.\d+\.\d+\.\d+))(:\d+)?$/.test(host)
            ? "http"
            : "https";
        origin = "".concat(protocol, "://").concat(host);
    }
    return origin;
}
exports.default = getOrigin;
