const path = require("path");

const _langs = require("./data");

const zh = _langs["zh-CN"];

// delete _langs.zh;

const {
  getFiles,
  readJsonFile,
  getFileNameAndExt,
  traverseObject,
  cloneObject,
  writeFileByJson,
} = require("./tools");
const { isEmpty } = require("./is");

const from = path.join(__dirname, "from/origin");
const outDir = path.join(__dirname, "to");

const files = getFiles(from);

const map = {};

const allMap = {};

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

  // 已需要翻译json的value作为key建立 map
  traverseObject(map, ({ key, value, obj }) => {
    if (isEmpty(flatMap[value])) flatMap[value] = { keys: [], objs: [] };

    flatMap[value].keys.push(key);
    flatMap[value].objs.push(obj);

    if (flatMap[value].keys.length > 1) multiMap[value] = flatMap[value];
  });

  /**@type {Record<zh|'en'|string, string>} 已有语言翻译map */
  const langValueMap = _langs;

  const langMap = {};

  const langs = Object.keys(langValueMap);

  const lost = {};

  // 按照语言 把值注入到map中
  langs.forEach((lang) => {
    if (isEmpty(allMap[lang])) allMap[lang] = {};

    Object.keys(flatMap).forEach((key) => {
      const { keys, objs } = flatMap[key];

      keys.forEach((k, i) => {
        const j = zh.findIndex((e) => e === key);

        const value = langValueMap[lang][j];

        if (j === -1 || isEmpty(value)) {
          if (isEmpty(lost[k])) lost[k] = { words: key, toLangs: [] };

          lost[k].toLangs.push(lang);
        }

        objs[i][k] = value || key;
        allMap[lang][k] = value || key;
      });
    });

    langMap[lang] = cloneObject(map);
  });

  // 遍历语言
  for (const key in langMap) {
    const dir = path.join(outDir, key);

    writeFileByJson(
      path.join(dir, "all.json"),
      JSON.stringify(allMap[key], null, 2),
      () => {
        console.log("写入All文件成功");
      }
    );
  }

  // 总map
  // writeFileByJson(
  //   path.join(outDir, "all.json"),
  //   JSON.stringify(allMap, null, 2),
  //   () => {
  //     console.log("写入All文件成功");
  //   }
  // );

  writeFileByJson(
    path.join(outDir, "repeat.json"),
    JSON.stringify(multiMap, null, 2),
    () => {
      console.log("写入重复值文件成功");
    }
  );

  writeFileByJson(
    path.join(outDir, "lost.json"),
    JSON.stringify(lost, null, 2),
    () => {
      console.log("写入丢失值文件成功");
    }
  );
}
