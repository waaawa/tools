const fs = require("fs");
const path = require("path");

const dirs = [path.join(__dirname, "from")];

// const dirs = ["D:/work/htvision-web/src/layout/rg05-action"];

const outDir = path.join(__dirname, "to");

let split = true;

let sets = new Set();

let num = 0;
let count = 0;

const list = [];

function traverseFolder(folderPath) {
  // 读取文件夹列表
  const files = fs.readdirSync(folderPath);

  // 遍历文件夹列表
  files.forEach((fileName) => {
    // 拼接当前文件路径
    const filePath = path.join(folderPath, fileName);

    const outPath = path.join(outDir, fileName);

    // 判断该路径是文件夹还是文件
    const stats = fs.statSync(filePath);
    if (stats.isDirectory()) {
      // 如果是文件夹，递归遍历
      traverseFolder(filePath);
    } else if (stats.isFile()) {
      // 如果是文件，执行操作

      list.push([filePath, outPath]);
    }
  });

  return list;
}

function fileHandler() {
  dirs.forEach((dir) => {
    traverseFolder(dir);
  });

  count = list.length;

  list.forEach(([filePath, outPath]) => {
    handler(filePath, outPath);
  });
}

function readFile(filePath, callback) {
  fs.readFile(filePath, "utf8", (err, str) => {
    if (err) {
      console.error("Error reading file:", err);
      return;
    }
    try {
      callback(str);
    } catch (err) {
      console.error("Error parsing JSON:", err);
    }
  });
}

function writeFile(filePath, data, callback) {
  fs.writeFile(filePath, data, (err) => {
    if (err) {
      console.error(err);
      return;
    }
    callback();
    console.log("JSON文件已被保存");
  });
}

function appendFile(filePath, data, callback) {
  fs.appendFile(filePath, data, (err) => {
    if (err) {
      console.error(err);
      return;
    }
    callback();
    console.log("JSON文件已被追加");
  });
}

function handler(filePath, outPath) {
  readFile(filePath, (str) => {
    // 第一步：移除注释
    let withoutComments = str.replace(/\/\/.*$/gm, "");

    withoutComments = withoutComments.replace(/^[\s]*\/?\*.*/gm, "");

    // 第二步：移除console
    const withoutConsole = withoutComments.replace(/\bconsole\.[\s\S]*?;/g, "");

    const zhPattern = /([\u4e00-\u9fa5]+)/gm;

    // 使用replace方法替换匹配到的中文字符，将它们用花括号包起来
    const outputArr = withoutConsole.match(zhPattern);

    if (split) {
      outputArr?.forEach((item) => {
        sets.add(item);
      });

      if (++num >= count) {
        const res = [...sets].reduce((map, e) => {
          map[e] = e;
          return map;
        }, {});

        writeFile(
          path.join(outDir, "list.json"),
          JSON.stringify(res, null, 2),
          () => {
            console.log(`写入${filePath}完成`);
          }
        );
      }
      return;
    }

    writeFile(outPath, outputArr.join("\n"), () => {
      console.log(`写入${filePath}完成`);
    });
  });
}

fileHandler();
