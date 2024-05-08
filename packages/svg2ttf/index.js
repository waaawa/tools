const svgtofont = require("svgtofont");
const path = require("path");

const _unicodeMap = {
  您: '\u60a8',
};

svgtofont({
  src: path.resolve(__dirname, "svg/from"), // svg path
  dist: path.resolve(__dirname, "svg/to"), // output path
  styleTemplates: path.resolve(__dirname, "styles"), // file templates path (optional)
  fontName: "yuan", // font name
  css: true, // Create CSS files.
  useNameAsUnicode: true,
  svgicons2svgfont: {
    fontHeight: 1000,
    // ascent: 1000,
    // normalize: true,
    centerVertically: true,
    centerVertically: true
  },
});
