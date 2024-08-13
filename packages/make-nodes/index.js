const fs = require("fs");
const path = require("path");

const outDir = path.join(__dirname, "out");

const nodes = [
  {
    x: -555.0276652426121,
    y: -1.0883489764054357e-12,
    z: -3220.5119554114185,
    area: "computer",
    list: [
      {
        type: "computer",
        id: 2,
        name: "电脑2",
      },
      {
        type: "computer",
        id: 3,
        name: "电脑3",
      },
    ],
    id: 1,
  },
  {
    x: 294.9923576842466,
    y: -1.12510621472991e-12,
    z: -3124.972070590148,
    area: "server",
    list: [
      {
        type: "server",
        id: 5,
        name: "服务器5",
      },
      {
        type: "server",
        id: 6,
        name: "服务器6",
      },
      {
        type: "server",
        id: 7,
        name: "服务器7",
      },
      {
        type: "server",
        id: 8,
        name: "服务器8",
      },
      {
        type: "server",
        id: 9,
        name: "服务器9",
      },
      {
        type: "server",
        id: 10,
        name: "服务器10",
      },
      {
        type: "server",
        id: 11,
        name: "服务器11",
      },
      {
        type: "server",
        id: 12,
        name: "服务器12",
      },
    ],
    id: 4,
  },
  {
    x: 308.657149748484,
    y: 5.501581151594549e-13,
    z: -2477.6918824269756,
    area: "server",
    list: [
      {
        type: "server",
        id: 14,
        name: "服务器14",
      },
      {
        type: "server",
        id: 15,
        name: "服务器15",
      },
      {
        type: "server",
        id: 16,
        name: "服务器16",
      },
      {
        type: "server",
        id: 17,
        name: "服务器17",
      },
      {
        type: "server",
        id: 18,
        name: "服务器18",
      },
      {
        type: "server",
        id: 19,
        name: "服务器19",
      },
      {
        type: "server",
        id: 20,
        name: "服务器20",
      },
      {
        type: "server",
        id: 21,
        name: "服务器21",
      },
    ],
    id: 13,
  },
  {
    id: 22,
    name: "交换机22",
    type: "switch",
    x: 724.9420006947086,
    y: 6.886378955354089e-13,
    z: -3101.3493697264703,
  },
  {
    id: 23,
    name: "交换机23",
    type: "switch",
    x: 725.3771372416336,
    y: 5.579699046941793e-13,
    z: -2512.873054864657,
  },
  {
    id: 24,
    name: "交换机24",
    type: "switch",
    x: 1200.3855680688514,
    y: -1.2297403973296871e-12,
    z: -2653.7416048235755,
  },
  {
    id: 25,
    name: "防火墙25",
    type: "firewall",
    x: 1211.1919491811368,
    y: 5.059515139688411e-13,
    z: -2278.603049777611,
  },
  {
    id: 26,
    name: "路由器26",
    type: "router",
    x: 1211.1919491811368,
    y: 5.059515139688411e-13,
    z: -2278.603049777611,
  },
  {
    id: 27,
    name: "路由器27",
    type: "router",
    x: 1213.5519618116527,
    y: 3.95539038528942e-13,
    z: -1781.3494665294274,
  },
  {
    id: 28,
    name: "路由器28",
    type: "router",
    x: 1189.4445860155795,
    y: 3.146879965582943e-13,
    z: -1417.228744037902,
  },
  {
    id: 29,
    name: "路由器29",
    type: "router",
    x: 676.1311663823367,
    y: 3.1445068021537106e-13,
    z: -1416.159966244344,
  },
  {
    id: 30,
    name: "路由器30",
    type: "router",
    x: 645.4556768684063,
    y: 2.333296356901342e-13,
    z: -1050.823260348582,
  },
  {
    id: 31,
    name: "路由器31",
    type: "router",
    x: -541.1087023567374,
    y: 6.522901918634922e-13,
    z: -2847.6538650138527,
  },
  {
    id: 32,
    name: "路由器32",
    type: "router",
    x: -539.536262934993,
    y: 5.766411442852477e-13,
    z: -2496.960842529538,
  },
  {
    id: 33,
    name: "路由器33",
    type: "router",
    x: -556.1872824937374,
    y: 4.825430215779252e-13,
    z: -1773.1805721685773,
  },
  {
    id: 34,
    name: "路由器34",
    type: "router",
    x: -1051.777639137419,
    y: 4.778515570530137e-13,
    z: -1762.0520942823637,
  },
  {
    id: 35,
    name: "路由器35",
    type: "router",
    x: -1053.8368382160443,
    y: 2.865944783678647e-13,
    z: -1060.7067859839572,
  },
  {
    id: 36,
    name: "路由器36",
    type: "router",
    x: -549.6632307562214,
    y: 2.8427516943434425e-13,
    z: -1050.2615471351974,
  },
  {
    id: 37,
    name: "路由器37",
    type: "router",
    x: -1617.3469187147612,
    y: 2.750010704325854e-13,
    z: -1068.494718326679,
  },
  {
    id: 38,
    name: "防火墙38",
    type: "firewall",
    x: -2135.124352384022,
    y: 2.8891410110267843e-13,
    z: -1071.1534380681044,
  },
  {
    id: 39,
    name: "路由器39",
    type: "router",
    x: -2132.707896773774,
    y: 3.5864901677397374e-13,
    z: -1405.211578300063,
  },
  {
    id: 40,
    name: "路由器40",
    type: "router",
    x: -2141.216920931563,
    y: 2.2639424526638136e-13,
    z: -769.5890386204998,
  },
  {
    x: -2575.36976398544,
    y: 3.79624832633989e-13,
    z: -1459.6782547910198,
    area: "server",
    list: [
      {
        type: "server",
        id: 42,
        name: "服务器42",
      },
      {
        type: "server",
        id: 43,
        name: "服务器43",
      },
      {
        type: "server",
        id: 44,
        name: "服务器44",
      },
      {
        type: "server",
        id: 45,
        name: "服务器45",
      },
      {
        type: "server",
        id: 46,
        name: "服务器46",
      },
      {
        type: "server",
        id: 47,
        name: "服务器47",
      },
      {
        type: "server",
        id: 48,
        name: "服务器48",
      },
      {
        type: "server",
        id: 49,
        name: "服务器49",
      },
    ],
    id: 41,
  },
  {
    x: -2578.512732683935,
    y: 2.0791360077887966e-13,
    z: -716.3596149930205,
    area: "server",
    list: [
      {
        type: "server",
        id: 51,
        name: "服务器51",
      },
      {
        type: "server",
        id: 52,
        name: "服务器52",
      },
      {
        type: "server",
        id: 53,
        name: "服务器53",
      },
      {
        type: "server",
        id: 54,
        name: "服务器54",
      },
      {
        type: "server",
        id: 55,
        name: "服务器55",
      },
      {
        type: "server",
        id: 56,
        name: "服务器56",
      },
      {
        type: "server",
        id: 57,
        name: "服务器57",
      },
      {
        type: "server",
        id: 58,
        name: "服务器58",
      },
    ],
    id: 50,
  },
  {
    id: 59,
    name: "交换机59",
    type: "switch",
    x: 98.94649101690993,
    y: 1.0662571450361468e-13,
    z: -480.19952810659197,
  },
  {
    id: 60,
    name: "路由器60",
    type: "router",
    x: 646.2506225169752,
    y: 1.0203596866506534e-13,
    z: -459.52915045837585,
  },
  {
    id: 61,
    name: "路由器61",
    type: "router",
    x: 1152.1550050381109,
    y: 1.0203596866441006e-13,
    z: -459.52915045542477,
  },
  {
    id: 62,
    name: "路由器62",
    type: "router",
    x: 1181.538678456461,
    y: -3.280804143895921e-14,
    z: 107.75428319925248,
  },
  {
    id: 63,
    name: "路由器63",
    type: "router",
    x: 626.4388874910576,
    y: 1.7952896242529524e-12,
    z: 106.73431719228591,
  },
  {
    id: 64,
    name: "路由器64",
    type: "router",
    x: 102.21244040947124,
    y: -2.8254520835351425e-14,
    z: 117.2470495056206,
  },
  {
    id: 65,
    name: "路由器65",
    type: "router",
    x: -591.372258813551,
    y: -1.9018057296971684e-12,
    z: 362.97157559524203,
  },
  {
    id: 66,
    name: "防火墙66",
    type: "firewall",
    x: -610.189742790369,
    y: -1.6433122773014628e-13,
    z: 760.0820559708229,
  },
  {
    id: 67,
    name: "路由器67",
    type: "router",
    x: -607.875891553308,
    y: -2.4770317011052824e-13,
    z: 1205.5559046082656,
  },
  {
    id: 68,
    name: "路由器68",
    type: "router",
    x: -1124.026233262212,
    y: -1.4398925492613716e-13,
    z: 748.4699548307067,
  },
  {
    id: 69,
    name: "路由器69",
    type: "router",
    x: -1138.7258646267965,
    y: -2.566917515928617e-13,
    z: 1226.036876822692,
  },
  {
    x: -1703.0973338629892,
    y: -8.962423193430563e-14,
    z: 633.6316575427057,
    area: "server",
    list: [
      {
        type: "server",
        id: 71,
        name: "服务器71",
      },
      {
        type: "server",
        id: 72,
        name: "服务器72",
      },
      {
        type: "server",
        id: 73,
        name: "服务器73",
      },
      {
        type: "server",
        id: 74,
        name: "服务器74",
      },
      {
        type: "server",
        id: 75,
        name: "服务器75",
      },
      {
        type: "server",
        id: 76,
        name: "服务器76",
      },
      {
        type: "server",
        id: 77,
        name: "服务器77",
      },
      {
        type: "server",
        id: 78,
        name: "服务器78",
      },
    ],
    id: 70,
  },
  {
    x: -1702.0274581629983,
    y: -2.521980593283895e-13,
    z: 1275.7990860148973,
    area: "server",
    list: [
      {
        type: "server",
        id: 80,
        name: "服务器80",
      },
      {
        type: "server",
        id: 81,
        name: "服务器81",
      },
      {
        type: "server",
        id: 82,
        name: "服务器82",
      },
      {
        type: "server",
        id: 83,
        name: "服务器83",
      },
      {
        type: "server",
        id: 84,
        name: "服务器84",
      },
      {
        type: "server",
        id: 85,
        name: "服务器85",
      },
      {
        type: "server",
        id: 86,
        name: "服务器86",
      },
      {
        type: "server",
        id: 87,
        name: "服务器87",
      },
    ],
    id: 79,
  },
  {
    x: -374.44494906624686,
    y: -5.066857918441547e-13,
    z: 2301.90994334326,
    area: "server",
    list: [
      {
        type: "server",
        id: 89,
        name: "服务器89",
      },
      {
        type: "server",
        id: 90,
        name: "服务器90",
      },
      {
        type: "server",
        id: 91,
        name: "服务器91",
      },
      {
        type: "server",
        id: 92,
        name: "服务器92",
      },
      {
        type: "server",
        id: 93,
        name: "服务器93",
      },
      {
        type: "server",
        id: 94,
        name: "服务器94",
      },
      {
        type: "server",
        id: 95,
        name: "服务器95",
      },
      {
        type: "server",
        id: 96,
        name: "服务器96",
      },
    ],
    id: 88,
  },
  {
    x: 181.85103609767813,
    y: -5.057001690281982e-13,
    z: 2307.4710927965903,
    area: "computer",
    list: [
      {
        type: "computer",
        id: 98,
        name: "电脑98",
      },
      {
        type: "computer",
        id: 99,
        name: "电脑99",
      },
      {
        type: "computer",
        id: 100,
        name: "电脑100",
      },
      {
        type: "computer",
        id: 101,
        name: "电脑101",
      },
      {
        type: "computer",
        id: 102,
        name: "电脑102",
      },
      {
        type: "computer",
        id: 103,
        name: "电脑103",
      },
      {
        type: "computer",
        id: 104,
        name: "电脑104",
      },
      {
        type: "computer",
        id: 105,
        name: "电脑105",
      },
    ],
    id: 97,
  },
  {
    x: 1451.1981080382095,
    y: 4.803459092421891e-13,
    z: 1942.7143421279352,
    area: "computer",
    list: [
      {
        type: "computer",
        id: 107,
        name: "电脑107",
      },
      {
        type: "computer",
        id: 108,
        name: "电脑108",
      },
      {
        type: "computer",
        id: 109,
        name: "电脑109",
      },
      {
        type: "computer",
        id: 110,
        name: "电脑110",
      },
      {
        type: "computer",
        id: 111,
        name: "电脑111",
      },
      {
        type: "computer",
        id: 112,
        name: "电脑112",
      },
      {
        type: "computer",
        id: 113,
        name: "电脑113",
      },
      {
        type: "computer",
        id: 114,
        name: "电脑114",
      },
    ],
    id: 106,
  },
  {
    x: 953.2540797823417,
    y: -1.3420598257310353e-12,
    z: 1948.100131071204,
    area: "server",
    list: [
      {
        type: "server",
        id: 116,
        name: "服务器116",
      },
      {
        type: "server",
        id: 117,
        name: "服务器117",
      },
      {
        type: "server",
        id: 118,
        name: "服务器118",
      },
      {
        type: "server",
        id: 119,
        name: "服务器119",
      },
      {
        type: "server",
        id: 120,
        name: "服务器120",
      },
      {
        type: "server",
        id: 121,
        name: "服务器121",
      },
      {
        type: "server",
        id: 122,
        name: "服务器122",
      },
      {
        type: "server",
        id: 123,
        name: "服务器123",
      },
    ],
    id: 115,
  },
  {
    x: 1659.4119952168157,
    y: -1.1441822136513283e-13,
    z: 575.2938591044071,
    area: "server",
    list: [
      {
        type: "server",
        id: 125,
        name: "服务器125",
      },
      {
        type: "server",
        id: 126,
        name: "服务器126",
      },
      {
        type: "server",
        id: 127,
        name: "服务器127",
      },
      {
        type: "server",
        id: 128,
        name: "服务器128",
      },
      {
        type: "server",
        id: 129,
        name: "服务器129",
      },
      {
        type: "server",
        id: 130,
        name: "服务器130",
      },
      {
        type: "server",
        id: 131,
        name: "服务器131",
      },
      {
        type: "server",
        id: 132,
        name: "服务器132",
      },
    ],
    id: 124,
  },
  {
    id: 142,
    name: "交换机142",
    type: "switch",
    x: 73.85611992022541,
    y: 2.285772397640062e-13,
    z: -1049.4203718265549,
  },
  {
    id: 143,
    name: "电脑143",
    type: "computer",
    x: 1601.030928097606,
    y: 9.431588252911469e-13,
    z: -151.60973413240413,
  },
  {
    x: 2048.539712574103,
    y: -1.3274079720820151e-12,
    z: 1292.114048437189,
    id: 148,
    area: "computer",
    list: [
      {
        type: "computer",
        id: 144,
        name: "电脑144",
      },
      {
        type: "computer",
        id: 145,
        name: "电脑145",
      },
      {
        type: "computer",
        id: 146,
        name: "电脑146",
      },
      {
        type: "computer",
        id: 147,
        name: "电脑147",
      },
    ],
  },
  {
    id: 148,
    name: "路由器148",
    type: "router",
    x: -371.4602874258969,
    y: -1.3274079720820151e-12,
    z: 1882.114048437189,
  },
  {
    id: 149,
    name: "路由器149",
    type: "router",
    x: 189.98510497627126,
    y: -4.1188037329978207e-13,
    z: 1864.9442957141193,
  },
  {
    id: 150,
    name: "交换机150",
    type: "switch",
    x: -102.11934767067805,
    y: -3.3763553932929676e-13,
    z: 1520.5752891104573,
  },
  {
    id: 151,
    name: "防火墙151",
    type: "firewall",
    x: 193.03369100207965,
    y: -2.536639869722806e-13,
    z: 1222.4010372056773,
  },
  {
    id: 152,
    name: "电脑152",
    type: "computer",
    x: -50.38296500438946,
    y: -1.9911087864280312e-13,
    z: 896.7156788611402,
  },
  {
    id: 153,
    name: "交换机153",
    type: "switch",
    x: 701.1000767606357,
    y: -2.0153222672918707e-13,
    z: 907.6204612007132,
  },
  {
    id: 154,
    name: "防火墙154",
    type: "firewall",
    x: 1196.7959113607808,
    y: -2.0433771505580097e-13,
    z: 920.2552573830438,
  },
  {
    id: 155,
    name: "路由器155",
    type: "router",
    x: 963.0568330759623,
    y: -3.3782584063544836e-13,
    z: 1511.4323300019298,
  },
  {
    id: 156,
    name: "路由器156",
    type: "router",
    x: 1430.5970810974736,
    y: -3.353186936483731e-13,
    z: 1510.1411437651745,
  },
  {
    id: 157,
    name: "交换机157",
    type: "switch",
    x: 1204.816206524799,
    y: -2.7004428624579e-13,
    z: 1216.1713469100714,
  },
  {
    id: 158,
    name: "交换机158",
    type: "switch",
    x: 1620.4912044982514,
    y: -2.7113491631754085e-13,
    z: 1211.0831080948076,
  },
];

const nameMap = {
  router: "路由器",
  switch: "交换机",
  computer: "电脑",
  server: "服务器",
  firewall: "防火墙",
};

function makeNodes({ count, type }) {
  const startId = findLastId(nodes);

  const list = [];

  Array(count)
    .fill(0)
    .forEach((_e, i) => {
      const id = startId + i + 1;
      list.push({
        id,
        name: `${nameMap[type]}${id}`,
        type: type,
      });
    });

  return list;
}

function makeAera({ pos, count, type }) {
  const areaName = findAreaId(nodes, type);
  const _nodes = makeNodes({ count, type });

  return {
    x: pos[0],
    y: pos[1],
    z: pos[2],
    area: type + areaName,
    list: _nodes,
  };
}

function findAreaId(nodes, type) {
  const list = [];
  nodes.forEach((e) => {
    if (e.area && e.area.startsWith(type)) {
      list.push(e.area.match(/\d+/)[0]);
    }
  });

  if (!list.length) return 1;

  return Math.max(...list) + 1;
}

function findLastId(nodes) {
  const list = [];

  nodes.forEach((e) => {
    if (e.area) {
      list.push(findLastId(e.list));
    } else {
      list.push(e.id);
    }
  });

  console.log(list.flat(2));

  return Math.max(...list.flat());
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

function arrangeId(nodes) {
  let id = 0;

  const areaCount = {};

  nodes.forEach((e) => {
    if (e.area) {
      id++;
      e.id = id;
      e.list.forEach((_e, i) => {
        id++;
        _e.id = id;
        _e.name = `${nameMap[_e.type]}${id}`;
      });
    } else {
      id++;

      e.id = id;
      e.name = `${nameMap[e.type]}${id}`;
    }
  });

  writeJsonFile(outDir + "aa.json", JSON.stringify(nodes), () => {});
}

function makeLinearNodes({ count, distance, startPos, type }) {
  const startId = findLastId(nodes);

  const list = [];

  Array(count)
    .fill(0)
    .map((e, i) => {
      const id = startId + i + 1;
      list.push({
        id,
        name: nameMap[type] + id,
        type,
        x: startPos[0] + i * distance[0],
        y: startPos[1] + i * distance[1],
        z: startPos[2] + i * distance[2],
      });
    });

  return list;
}

// console.log(
//   makeNodes({
//     count: 8,
//     type: "server",
//   })
// );

// console.log(
//   makeNodes({
//     count: 2,
//     name: "电脑",
//     type: "computer",
//     startId: 8,
//     area: "computer1",
//   })
// );

// console.log(
//   makeLinearNodes({
//     count: 3,
//     distance: [0, 0, 300],
//     startPos: [-200, 0, -800],
//     type: "switch",
//     name: "交换机",
//   })
// );

// console.log(
//   makeLinearNodes({
//     count: 6,
//     distance: [-300, 0, 0],
//     startPos: [200, 0, -550],
//     type: "router",
//   })
// );

// console.log(makeAera({ pos: [-600, 0, -950], count: 2, type: "server" }));

arrangeId(nodes);
