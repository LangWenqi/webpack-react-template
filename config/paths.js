const path = require("path");

const paths = {
  src: path.resolve(process.cwd(), "./src/"),
  public: path.resolve(process.cwd(), "./public/"),
  build: path.resolve(process.cwd(), "./build/"),
  theme: path.resolve(process.cwd(), "./theme.js"),
  root: path.resolve(process.cwd(), "./"),
  extends: path.resolve(process.cwd(), "./webpack.config.js")
}

module.exports = paths;