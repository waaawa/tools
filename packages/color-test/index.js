function isArray(val) {
  return val && Array.isArray(val);
}

function calcGuagePointPos({
  center, // 中心点
  radius, // 半径
  startPos, // 画布起始位置
  size, // 画布宽高
  startAngle, // 起始角度
  endAngle, // 结束角度
  minValue, // 对应起始角度的值
  maxValue, // 对应结束角度的值
  currentValue, // 当前值
}) {
  // 将角度转换为弧度
  const startRad = startAngle * (Math.PI / 180);
  const endRad = endAngle * (Math.PI / 180);

  // 计算角度范围
  const angleRange = endRad - startRad;

  // 计算值范围
  const valueRange = maxValue - minValue;

  // 计算当前值对应的角度（线性插值）
  const currentRad =
    startRad + ((currentValue - minValue) / valueRange) * angleRange;

  const min = Math.min(...size);
  radius = (min / 2) * (radius / 100);

  const xOffset = radius * Math.cos(currentRad);
  const yOffset = radius * Math.sin(currentRad);

  const a = size[1] / size[0];

  const b = ((size[0] - size[1]) / size[0] / 2) * 100;

  const x = (xOffset + center[0]) * a + b;
  const y = center[1] - yOffset;

  const finalX = x + startPos[0];
  const finalY = y + startPos[1];

  return [finalX, finalY];
}

function genLinearGradient(colors, size = 0.05) {
  const res = [];

  function colorLerp(color1, color2, t) {
    const r = color1[0] * (1 - t) + color2[0] * t;
    const g = color1[1] * (1 - t) + color2[1] * t;
    const b = color1[2] * (1 - t) + color2[2] * t;

    function toHex(num) {
      return Math.floor(num * 255)
        .toString(16)
        .padStart(2, "0");
    }

    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  }

  for (let i = 0; i < colors.length - 1; i++) {
    const a = colors[i];
    const b = colors[i + 1];

    const len = Math.ceil((b[0] - a[0]) / size - 1) || 1;

    for (let j = 0; j < len; j++) {
      res.push([
        a[0] + (j / len) * (b[0] - a[0]),
        colorLerp(a[1], b[1], j / len),
      ]);
    }
  }

  return res;
}

function parseColor(color) {
  let rgba = [0, 0, 0, 1]; // 默认值为黑色，不透明

  // 检查是否为十六进制颜色
  if (isArray(color)) {
    return color.length === 3 ? [...color, 1] : color;
  } else if (color.startsWith("#")) {
    // 移除#号
    color = color.slice(1);

    // 如果是3个字符的十六进制，则每个字符代表两位
    if (color.length === 3 || color.length === 4) {
      color =
        color[0] +
        color[0] +
        color[1] +
        color[1] +
        color[2] +
        color[2] +
        (color[3] || "F") +
        (color[3] || "F");
    } else if (color.length === 6) {
      color = color + "FF";
    }

    // 将十六进制转换为十进制
    rgba[0] = parseInt(color.slice(0, 2), 16);
    rgba[1] = parseInt(color.slice(2, 4), 16);
    rgba[2] = parseInt(color.slice(4, 6), 16);
    rgba[3] = parseInt(color.slice(6, 8), 16) / 255;
  } else if (color.startsWith("rgba(") || color.startsWith("rgb(")) {
    // 移除rgba(和)
    color = color.slice(5, -1);
    // 按逗号分割
    const parts = color.split(",");
    rgba[0] = parseInt(parts[0].trim());
    rgba[1] = parseInt(parts[1].trim());
    rgba[2] = parseInt(parts[2].trim());
    rgba[3] = parseFloat(`${parts[3] || "FF"}`.trim());
  }

  return rgba;
}

function getColorLerp(colors, value) {
  const min = colors[0][0];
  const max = colors.slice(-1)[0][0];

  const v = Math.max(Math.min(max, value), min);

  const i = colors.findIndex((e) => e[0] >= v) - 1;

  const t = (v - colors[i][0]) / (colors[i + 1][0] - colors[i][0]);

  const color1 = colors[i][1];
  const color2 = colors[i + 1][1];

  const r = parseInt(color1[0] * (1 - t) + color2[0] * t);
  const g = parseInt(color1[1] * (1 - t) + color2[1] * t);
  const b = parseInt(color1[2] * (1 - t) + color2[2] * t);
  const a = parseInt(color1[3] * (1 - t) + color2[3] * t);

  return { r, g, b, a };
}

function splitGradient(colors, value) {
  if (value === 0) return [];

  let i = colors.findIndex((e) => e[0] >= value);

  if (i === -1) i = colors.length - 1;

  colors = JSON.parse(JSON.stringify(colors)).map((e) => {
    e[1] = parseColor(e[1]);
    return e;
  });

  let temp = [];

  if (value > colors.slice(-1)[0][0]) {
    temp = colors;
  } else {
    const { r, g, b, a } = getColorLerp(colors, value);
    temp = colors.slice(0, i).concat([[value, [r, g, b, a]]]);
  }

  return temp.map((e) => {
    const p = (e[0] / value) * 1;
    return {
      offset: p,
      color: `rgba(${e[1][0]},${e[1][1]},${e[1][2]},${e[1][3]})`,
    };
  });
}

console.log(
  splitGradient(
    [
      [0, "#42D64F"],
      [0.2, "#EFFF38"],
      [0.4, "#FF7A2F"],
      [1, "#FF4343"],
    ],
    0.08
  )
);
