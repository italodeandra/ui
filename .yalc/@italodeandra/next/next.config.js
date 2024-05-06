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
/** @type {import("next").NextConfig} */
var nextConfig = {
    reactStrictMode: true,
    webpack: function (config, _a) {
        var isServer = _a.isServer;
        if (!isServer) {
            config.resolve.alias = __assign(__assign({}, config.resolve.alias), { mongodb: false, crypto: false, jsonwebtoken: false, bson: false, nodemailer: false, mailgen: false, fs: false, sharp: false, papr: false, "mongodb-memory-server": false, "@adiwajshing/baileys": false, "@hapi/boom": false, minio: false, openai: false });
        }
        return config;
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "i.imgur.com",
                pathname: "**",
            },
        ],
    },
};
module.exports = nextConfig;
