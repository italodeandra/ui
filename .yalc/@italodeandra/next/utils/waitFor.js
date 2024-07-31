"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ms_1 = __importDefault(require("ms"));
async function waitFor(asyncFunction, interval, timeout) {
    const start = Date.now();
    return new Promise((resolve, reject) => {
        const intervalId = setInterval(async () => {
            let result;
            try {
                result = await asyncFunction();
            }
            catch (e) {
                clearInterval(intervalId);
                reject(e);
                return;
            }
            if (result) {
                clearInterval(intervalId);
                resolve(result);
            }
            else if (Date.now() - start >=
                (typeof timeout === "string" ? (0, ms_1.default)(timeout) : timeout)) {
                clearInterval(intervalId);
                reject(new Error("Timeout reached"));
            }
        }, typeof interval === "string" ? (0, ms_1.default)(interval) : interval);
    });
}
exports.default = waitFor;
