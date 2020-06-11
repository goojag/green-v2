const path = require('path');
// const webpack = require('webpack');
const withSASS = require("@zeit/next-sass")
const withCSS = require("@zeit/next-css")
module.exports = withSASS(withCSS())

module.exports = {
  webpack: config => {
    config.resolve.modules.push(path.resolve(__dirname));
    return config;
  }
};