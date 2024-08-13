const path = require("path");

const _langs = require("./data");

const zh = _langs.zh;

delete _langs.zh;

const {
  getFiles,
  readJsonFile,
  getFileNameAndExt,
  traverseObject,
  cloneObject,
  writeFileByJson,
} = require("./tools");
const { isEmpty } = require("./is");

const from = path.join(__dirname, "from/json");
const outDir = path.join(__dirname, "to");

const files = getFiles(from);

const map = {};

files.forEach((url, index) => {
  readJsonFile(url, (obj) => {
    const key = getFileNameAndExt(url);
    map[key] = obj;

    if (index === files.length - 1) {
      handler(map);
    }
  });
});

function handler(map) {
  const flatMap = {};

  const multiMap = {};

  traverseObject(map, ({ key, value, obj }) => {
    if (isEmpty(flatMap[value])) flatMap[value] = { keys: [], objs: [] };

    flatMap[value].keys.push(key);
    flatMap[value].objs.push(obj);

    if (flatMap[value].keys.size > 1) multiMap[value] = flatMap[value];
  });

  const langValueMap = _langs;

  const langMap = {};

  const langs = Object.keys(langValueMap);

  const lost = [];

  langs.forEach((lang) => {
    zh.forEach((value, index) => {
      if (!flatMap[value]) return lost.push({ value, index });

      const { keys, objs } = flatMap[value];

      keys.forEach((key, i) => {
        objs[i][key] = langValueMap[lang][index];
      });
    });

    langMap[lang] = cloneObject(map);
  });

  for (const key in langMap) {
    const dir = path.join(outDir, key);

    lost.forEach((obj) => {
      obj[key] = langValueMap[key][obj.index];
    });

    Object.keys(langMap[key]).forEach((name) => {
      const filePath = path.join(dir, name);

      writeFileByJson(
        filePath,
        JSON.stringify(langMap[key][name], null, 2),
        () => {
          console.log(filePath);
        }
      );
    });
  }

  writeFileByJson(
    path.join(outDir, "lost.json"),
    JSON.stringify(lost, null, 2),
    () => {
      console.log("写入丢失值文件成功");
    }
  );
}
