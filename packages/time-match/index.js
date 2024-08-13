const { toTimestamp } = require("./date");

const rawEvents = [
  {
    type: "a",
    begin: "2023-10-10 10:30:00",
    end: "2023-10-10 10:30:50",
    from: "1",
    to: "2",
  },
  {
    type: "b",
    begin: "2023-10-10 10:31:00",
    end: "2023-10-10 10:31:50",
    from: "1",
    to: "2",
  },
];

// 开始和结束从事件中获取
const config = rawEvents.reduce(
  (res, cur) => {
    if (res.start === "" || toTimestamp(cur.begin) < toTimestamp(res.start)) {
      res.start = cur.begin;
    }

    if (res.end === "" || toTimestamp(cur.end) > toTimestamp(res.end)) {
      res.end = cur.end;
    }

    return res;
  },
  {
    start: "",
    end: "",
  }
);

/**
 * 匹配开始且未结束的事件和已执行进度
 * @param {typeof rawEvents} events
 * @param {number} time
 * @returns {(typeof rawEvents[number] & {progress: number, progressChange: boolean})[]}
 */
function timeMatch(events, time) {
  const timestamp = toTimestamp(time);

  const matched = events.filter((event) => {
    const begin = toTimestamp(event.begin);
    const end = toTimestamp(event.end);

    let flag = begin <= timestamp && end >= timestamp;

    const temp = event.progress;

    if (flag) {
      event.progress = +Number((timestamp - begin) / (end - begin)).toFixed(3);
    } else if (!flag && event.progress > 0 && event.progress < 1) {
      event.progress = 1;
      flag = true;
    }

    if (flag) {
      event.progressChange = temp !== event.progress;
    } else {
      event.progressChange = false;
    }

    return flag;
  });

  return matched;
}

function play() {
  const startTime = toTimestamp(config.start);
  const endTime = toTimestamp(config.end);

  const events = JSON.parse(JSON.stringify(rawEvents));

  let played = 0;

  // const now = performance.now();

  function loop() {
    // played += performance.now() - now;
    played += 1000 / 10;

    if (played + startTime > endTime) {
      return clearInterval(timerNum);
    }

    const list = timeMatch(events, played + startTime);

    const playedList = [];

    list.forEach((event) => {
      if (playedList.includes(event)) {
        return;
      }

      if (event.progress === 1) {
        playedList.push(event);
      }

      // 执行事件动画
      if (event.progressChange) {
        console.log(event);
      }
    });
  }

  const timerNum = setInterval(loop, 1000 / 60);

  return () => clearInterval(timerNum);
}

play();
