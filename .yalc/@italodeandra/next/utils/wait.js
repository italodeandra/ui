"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ms_1 = __importDefault(require("ms"));
function wait(time) {
    return new Promise(function (resolve) {
        setTimeout(resolve, typeof time === "string" ? (0, ms_1.default)(time) : time);
    });
}
exports.default = wait;
