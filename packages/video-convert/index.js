const path = require("path");
const { convertM3U8ByDir } = require("./lib");

const from = path.resolve(__dirname, "from");
const to = path.resolve(__dirname, "to");

convertM3U8ByDir(from, to);
