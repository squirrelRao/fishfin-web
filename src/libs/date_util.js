//获取最近第N天日期字符串
export function getLatestDate(days) {
  var start = new Date();
  start.setTime(start.getTime() - 3600 * 1000 * 24 * days);
  var y = 1900 + start.getYear();
  var m = "0" + (start.getMonth() + 1);
  var d = "0" + start.getDate();
  var start_date_str =
    y +
    "-" +
    m.substring(m.length - 2, m.length) +
    "-" +
    d.substring(d.length - 2, d.length);

  return start_date_str;
}

//获取截止到最近第N天的一个周(返回起始时间字符串数组)
export function getLatestWeekDate(end_pre) {
  var end = new Date();
  end.setTime(end.getTime() - 3600 * 1000 * 24 * end_pre);
  var start = new Date();
  start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
  console.log(start + " - " + end);
  var y = 1900 + start.getYear();
  var m = "0" + (start.getMonth() + 1);
  var d = "0" + start.getDate();
  var start_date_str =
    y +
    "-" +
    m.substring(m.length - 2, m.length) +
    "-" +
    d.substring(d.length - 2, d.length);

  y = 1900 + end.getYear();
  m = "0" + (end.getMonth() + 1);
  d = "0" + end.getDate();

  var end_date_str =
    y +
    "-" +
    m.substring(m.length - 2, m.length) +
    "-" +
    d.substring(d.length - 2, d.length);
  return [start_date_str, end_date_str];
}

//获取某一天之前的N天的起始时间数组
export function getLatestSpecDate(end_pre, days) {
  var end = new Date();
  end.setTime(end.getTime() - 3600 * 1000 * 24 * end_pre);
  var start = new Date();
  start.setTime(start.getTime() - 3600 * 1000 * 24 * days);
  console.log(start + " - " + end);
  var y = 1900 + start.getYear();
  var m = "0" + (start.getMonth() + 1);
  var d = "0" + start.getDate();
  var start_date_str =
    y +
    "-" +
    m.substring(m.length - 2, m.length) +
    "-" +
    d.substring(d.length - 2, d.length);

  y = 1900 + end.getYear();
  m = "0" + (end.getMonth() + 1);
  d = "0" + end.getDate();

  var end_date_str =
    y +
    "-" +
    m.substring(m.length - 2, m.length) +
    "-" +
    d.substring(d.length - 2, d.length);
  console.log(end_date_str);
  return [start_date_str, end_date_str];
}

//快捷选取日期组件
export function datePickerOptions() {
  return {
    shortcuts: [
      {
        text: "今天",
        onClick(picker) {
          picker.$emit("pick", new Date());
        }
      },
      {
        text: "明天",
        onClick(picker) {
          const date = new Date();
          date.setTime(date.getTime() + 3600 * 1000 * 24);
          picker.$emit("pick", date);
        }
      },
      {
        text: "后天",
        onClick(picker) {
          const date = new Date();
          date.setTime(date.getTime() + 3600 * 1000 * 24 * 2);
          picker.$emit("pick", date);
        }
      }
    ]
  };
}

//起始时间快捷组件
export function dateRangePickOption() {
  return {
    shortcuts: [
      {
        text: "今天",
        onClick(picker) {
          const end = new Date();
          const start = new Date();
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 0);
          picker.$emit("pick", [start, end]);
        }
      },
      {
        text: "本月",
        onClick(picker) {
          const end = new Date();
          const start = new Date(end.getFullYear(),end.getMonth(),1);
          picker.$emit("pick", [start, end]);
        }
      },
      {
        text: "最近3天",
        onClick(picker) {
          const end = new Date();
          const start = new Date();
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 3);
          picker.$emit("pick", [start, end]);
        }
      },
      {
        text: "最近7天",
        onClick(picker) {
          const end = new Date();
          const start = new Date();
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
          picker.$emit("pick", [start, end]);
        }
      },
      {
        text: "最近30天",
        onClick(picker) {
          const end = new Date();
          const start = new Date();
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
          picker.$emit("pick", [start, end]);
        }
      },
      {
        text: "最近90天",
        onClick(picker) {
          const end = new Date();
          const start = new Date();
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
          picker.$emit("pick", [start, end]);
        }
      },
       {
          text: "最近180天",
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 180);
            picker.$emit("pick", [start, end]);
          }
        }
          ,
          {
             text: "最近一年",
             onClick(picker) {
               const end = new Date();
               const start = new Date();
               start.setTime(start.getTime() - 3600 * 1000 * 24 * 365);
               picker.$emit("pick", [start, end]);
             }
           
      }
    ]
  };
}

export function getLocalTime(nS) {
  var date = new Date(nS * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
  var Y = date.getFullYear() + "-";
  var M =
    (date.getMonth() + 1 < 10
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1) + "-";
  var D = date.getDate() + " ";
  var h = date.getHours() + ":";
  var m = date.getMinutes() + ":";
  var s = date.getSeconds();
  return Y + M + D + h + m + s;
}

export function secondToDate(seconds) {
  if (seconds < 60) {
    return seconds + "秒";
  }

  var h = Math.floor(seconds / 3600);
  var m = Math.floor((seconds / 60) % 60);
  var s = Math.floor(seconds % 60);

  if (h == 0 && m > 0) {
    return m + "分" + s + "秒";
  }

  return h + "小时" + m + "分钟" + s + "秒";
}

export function getBetweendays(from, to) {
  const startDate = new Date(from);

  const endDate = new Date(to);

  const diff = endDate.getTime() - startDate.getTime(); //时间差的毫秒数 //计算出相差天数

  const days = Math.floor(diff / (24 * 3600 * 1000)); //计算出小时数
  const leave1 = diff % (24 * 3600 * 1000); //计算天数后剩余的毫秒数
  const hours = Math.floor(leave1 / (3600 * 1000)); //计算相差分钟数
  const leave2 = leave1 % (3600 * 1000); //计算小时数后剩余的毫秒数
  const minutes = Math.floor(leave2 / (60 * 1000)); //计算相差秒数
  const leave3 = leave2 % (60 * 1000); //计算分钟数后剩余的毫秒数
  const seconds = Math.round(leave3 / 1000);
  let returnStr = seconds + "秒";
  if (minutes > 0) {
    returnStr = minutes + "分" + returnStr;
  }
  if (hours > 0) {
    returnStr = hours + "小时" + returnStr;
  }
  if (days > 0) {
    returnStr = days + "天" + returnStr;
  }
  return returnStr;
}
