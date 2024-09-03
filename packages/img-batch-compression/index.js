const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

// 源文件夹路径
// const sourceDir = "D:/codes/site/素材/image";
const sourceDir = path.resolve(__dirname, "imgs/from");

async function readDir(dir) {
  const promise = new Promise();

  fs.readdirSync(sourceDir).forEach((file) => {
    const filePath = path.join(sourceDir, file);
    const stats = fs.statSync(filePath);

    // 检查是否为文件
    if (stats.isFile()) {
    } else if (stats.isDirectory) {
    }
  });
}

function batchCompression({ sourceDir, output, width, quality }) {
  // 确保目标文件夹存在
  if (!fs.existsSync(output)) {
    fs.mkdirSync(output, { recursive: true });
  }

  // 遍历源文件夹
  fs.readdirSync(sourceDir).forEach(async (file) => {
    const filePath = path.join(sourceDir, file);
    const stats = fs.statSync(filePath);

    // 检查是否为文件
    if (stats.isFile()) {
      // 提取文件扩展名
      const ext = path.extname(file).toLowerCase();

      const exts = [
        ".jpg",
        ".jpeg",
        ".png",
        ".gif",
        ".bmp",
        ".tiff",
        ".tif",
        ".psd",
        ".webp",
        ".svg",
        ".ico",
        ".heif",
        ".heic",
      ];

      // 检查是否为图片文件
      if (exts.includes(ext)) {
        // 构建目标文件路径
        const destinationPath = path.join(output, file);

        // 使用 sharp 压缩图片
        let tool = sharp(filePath);

        const metadata = await tool.metadata();

        if (metadata.width > width) tool.resize(width);

        tool.toFormat(ext.split(".")[1], { quality });

        // if (["jpg", "jpeg"].includes(ext)) {
        //   tool.jpeg({ quality }); // 调整质量为80（默认为100），数值越低，压缩率越高，图片质量越低
        // }

        // if (ext === "png") {
        //   tool.toFormat("png", { quality });
        //   tool.png({ quality });
        // }

        tool.toFile(destinationPath, (err, info) => {
          if (err) {
            console.error(`Error compressing ${filePath}:`, err);
          } else {
            console.log(`Compressed ${filePath} to ${destinationPath}`);
          }
        });
      }
    } else if (stats.isDirectory()) {
      batchCompression({
        sourceDir: path.join(sourceDir, file),
        output: path.join(output, file),
        width,
        quality,
      });
    }
  });
}

const cfgs = [
  {
    output: path.resolve(__dirname, "imgs/to/image"),
    width: 1920,
    quality: 90,
    sourceDir,
  },
  {
    output: path.resolve(__dirname, "imgs/to/mobile-image"),
    width: 1024,
    quality: 90,
    sourceDir,
  },
];

cfgs.forEach(batchCompression);

console.log("Image compression completed.");
