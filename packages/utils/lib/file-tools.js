const fs = require("fs");
const path = require("path");
const { isObject, isArray } = require("./is");

function isFile(path) {
  return fs.statSync(path).isFile();
}

function isDirectory(path) {
  return fs.statSync(path).isDirectory();
}

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
      list.push(...getFiles(filePath));
    } else if (stats.isFile()) {
      // 如果是文件，执行操作

      list.push(filePath);
    }
  });

  return list;
}

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

function createDir(filePath) {
  const dir = path.dirname(filePath);

  console.log(fs.existsSync(dir), dir, "==================");

  // 检查目录是否存在
  if (!fs.existsSync(dir)) {
    // 目录不存在，创建目录
    fs.mkdirSync(dir, { recursive: true });
  }
}

function writeFileByJson(filePath, data, callback) {
  createDir(filePath);

  fs.writeFile(filePath, data, (err) => {
    if (err) {
      console.error(err);
      return;
    }
    callback();
    console.log("JSON文件已被保存");
  });
}

function writeFileByList(outPath, set) {
  writeFileByJson(outPath, [...set].join("\n"), () => {
    console.log(`写入${outPath}完成`);
  });
}

function getFileNameAndExt(path) {
  const parts = path.split("\\"); // 分割路径
  const fileNameWithExtension = parts.pop(); // 获取文件名和后缀
  return fileNameWithExtension;
}

function getDirectory(filePath) {
  return path.dirname(filePath);
}

function getFileName(path) {
  const nameAndExt = getFileNameAndExt(path);

  return nameAndExt.split(".")[0];
}

function traverseObject(obj, callback) {
  for (const key in obj) {
    if (isObject(obj[key]) || isArray(obj[key])) {
      traverseObject(obj[key], callback);
    } else {
      callback({ key, value: obj[key], obj });
    }
  }
}

function cloneObject(obj) {
  return JSON.parse(JSON.stringify(obj));
}

module.exports = {
  getFiles,
  readJsonFile,
  writeFileByJson,
  writeFileByList,
  getFileNameAndExt,
  traverseObject,
  cloneObject,
  getFileName,
  getDirectory,
  createDir,
  isFile,
  isDirectory,
};
