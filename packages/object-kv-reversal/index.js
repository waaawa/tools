const fs = require("fs");
const path = require("path");

const dir = path.join(__dirname, "from");
const outDir = path.join(__dirname, "to");

function readJsonFile(filePath, callback) {
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      return;
    }
    try {
      let obj = JSON.parse(data);

      callback(obj);
    } catch (err) {
      console.error("Error parsing JSON:", err);
    }
  });
}

function writeJsonFile(filePath, data, callback) {
  fs.writeFile(filePath, data, (err) => {
    if (err) {
      console.error(err);
      return;
    }
    callback();
    console.log("JSON文件已被保存");
  });
}

function transformJson(obj) {
  const list = Object.keys(obj).reduce((arr, key) => {
    if (typeof obj[key] === "object") {
      arr.push(...transformJson(obj[key]));
    } else {
      arr.push(obj[key]);
    }

    return arr;
  }, []);

  return list;
}

function handler(filePath, outPath) {
  readJsonFile(filePath, (obj) => {
    const json = transformJson(obj);

    writeJsonFile(outPath, JSON.stringify(json, null, 2), () => {
      console.log(`写入${filePath}完成`);
    });
  });
}

function writeFile(outPath, set) {
  writeJsonFile(outPath, [...set].join("\n"), () => {
    console.log(`写入${outPath}完成`);
  });
}

const outPath = path.join(outDir, "list.txt");

function getFiles(folderPath) {
  // 读取文件夹列表
  const files = fs.readdirSync(folderPath);

  const list = [];

  // 遍历文件夹列表
  files.forEach(function (fileName) {
    // 拼接当前文件路径
    const filePath = path.join(folderPath, fileName);

    // 判断该路径是文件夹还是文件
    const stats = fs.statSync(filePath);
    if (stats.isDirectory()) {
      // 如果是文件夹，递归遍历
      traverseFolder(filePath);
    } else if (stats.isFile()) {
      // 如果是文件，执行操作

      list.push(filePath);
    }
  });

  return list;
}

let timer;

function fileHandler(folderPath) {
  const list = getFiles(folderPath);

  const set = new Set();

  let count = 0;

  list.forEach((filePath) => {
    count++;

    readJsonFile(filePath, (obj) => {
      const data = transformJson(obj);

      Object.values(data).forEach((value) => {
        set.add(value);
      });

      if (count >= list.length) {
        clearTimeout(timer);

        timer = setTimeout(() => {
          writeFile(outPath, set);
        }, 500);
      }
    });
  });
}

fileHandler(dir);
