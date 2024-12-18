const path = require("path");
const { compressVideoByDir } = require("./lib");

const from = path.resolve(__dirname, "from");
const to = path.resolve(__dirname, "to");

compressVideoByDir(from, to);
