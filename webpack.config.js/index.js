const merge = require("webpack-merge");

const devMode = process.env.NODE_ENV !== "production";
let clientConfig, serverConfig;
if (devMode) {
  clientConfig = require("./client.dev");
  serverConfig = require("./server.dev");
} else {
  clientConfig = require("./client.prod");
  serverConfig = require("./server.prod");
}

module.exports = [clientConfig, serverConfig];
