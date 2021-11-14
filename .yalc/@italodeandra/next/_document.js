"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("@emotion/react/jsx-runtime");
var document_1 = require("next/document");
// noinspection HtmlRequiredTitleElement
var Document = function (color) { return function () {
    return ((0, jsx_runtime_1.jsxs)(document_1.Html, __assign({ lang: "en" }, { children: [(0, jsx_runtime_1.jsxs)(document_1.Head, { children: [(0, jsx_runtime_1.jsx)("meta", { content: color, name: "theme-color" }, void 0), (0, jsx_runtime_1.jsx)("link", { rel: "preconnect", href: "https://fonts.googleapis.com" }, void 0), (0, jsx_runtime_1.jsx)("link", { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" }, void 0), (0, jsx_runtime_1.jsx)("link", { href: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;700&display=swap", rel: "stylesheet" }, void 0)] }, void 0), (0, jsx_runtime_1.jsxs)("body", { children: [(0, jsx_runtime_1.jsx)(document_1.Main, {}, void 0), (0, jsx_runtime_1.jsx)(document_1.NextScript, {}, void 0)] }, void 0)] }), void 0));
}; };
exports.default = Document;
