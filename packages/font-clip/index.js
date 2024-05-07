const fontUtils = require("pick-webfont");
const path = require("path");

// npm install pick-webfont -g
// pick-webfont --font=/xxx/1.ttf --text="你好，世界！" -o ~/Desktop/webfont
const words = "您";

const fontName = "AiDeMuGuangWuSuoBuZai-2";
const suffix = "ttf";

const dirName = fontName;

const options = {
  fontName: fontName,
  className: fontName,
  output: path.resolve(__dirname, `fonts/to/${dirName}`),
  font: path.resolve(__dirname, `fonts/from/${fontName}.${suffix}`),
  text: words,
};

fontUtils(options, (err) => {
  console.log(err);
});
