const { fileTools } = require("@wawawwaa/utils");
const { exec } = require("child_process");
const path = require("path");

function isMp4Ext(path) {
  /**@type {string} */
  const file = fileTools.getFileNameAndExt(path);

  return file.endsWith("mp4");
}

function convertM3U8ByDir(from, to) {
  const list = fileTools.getFiles(from);

  list.forEach((e) => {
    if (fileTools.isFile(e) && isMp4Ext(e)) {
      console.log("file", e);

      const url = fileTools.getDirectory(e).replace(from, to);

      convertM3U8(e, path.join(url, fileTools.getFileName(e) + "\\index.m3u8"));
    } else if (fileTools.isDirectory(e)) {
      console.log("directory", e);
    }
  });
}

function convertM3U8(from, to) {
  fileTools.createDir(to);

  const cmd = `ffmpeg -i ${from}  -c:v h264 -flags +cgop -g 30 -hls_time 5 -hls_list_size 0 ${to}`;

  exec(cmd, (error, stdout, stderr) => {
    if (error) {
      console.error(`执行的错误: ${error}`);
      return;
    }
    console.log(`标准输出: ${stdout}`);
    if (stderr) {
      console.error(`标准错误输出: ${stderr}`);
    }
  });
}

module.exports = {
  convertM3U8,
  convertM3U8ByDir,
};
