var fs = require("fs");
var path = require("path");
var ttf2woff2 = require("ttf2woff2");

const name = 'PingFang Regular';

var input = fs.readFileSync(path.relative(__dirname, `from/${name}.ttf`));

fs.writeFileSync(`./to/${name}.woff2`, ttf2woff2(input));
