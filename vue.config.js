// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path");

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  chainWebpack: config => {
    config.resolve.alias.set("@packages", resolve("packages"));
  }
};
