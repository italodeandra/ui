/* eslint-disable @typescript-eslint/no-require-imports */
const nextConfig = require("@italodeandra/next/next.config.js");
const { merge } = require("lodash");

/** @type {import("next").NextConfig} */
const config = {};

module.exports = merge(nextConfig, config);
