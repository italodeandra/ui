"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dynamic_1 = __importDefault(require("next/dynamic"));
function noSsr(Component) {
    return (0, dynamic_1.default)(Promise.resolve(Component), { ssr: false });
}
exports.default = noSsr;
